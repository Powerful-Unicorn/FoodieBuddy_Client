import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import api from '../../apis/api';

interface MessageItemProps {
  item: {
    text?: string; // 텍스트 메시지
    imageUri?: string; // 이미지 URI
    sentByUser?: boolean; // 사용자 메시지 여부
    buttons?: string[]; // 버튼 목록
    //menuId?: number; // 메뉴 ID 추가
  };
  isBookmarked?: boolean; // 북마크 상태
  onToggleBookmark: (bookmarked: boolean) => void; // 북마크 상태 변경 핸들러
  userId: number; // 사용자 ID 추가
}
const getMenuIdFromText = (text: string): number | null => {
  const match = text.match(/menu_id'\s*:\s*(\d+)/); // 정규식으로 숫자만 추출
  return match ? parseInt(match[1], 10) : null; // 숫자로 변환 후 반환
};
const MessageItem: React.FC<MessageItemProps> = ({
  item,
  isBookmarked = false, // 부모로부터 북마크 상태 전달받음
  onToggleBookmark, // 부모로부터 북마크 상태 변경 핸들러 전달받음
  userId,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(!!item.imageUri);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isBookmarkedUI, setIsBookmarkedUI] = useState(isBookmarked);

  // menuId를 텍스트에서 추출
  const menuIdNum = item.text ? getMenuIdFromText(item.text) : null;

  console.log('Extracted menuId:', menuIdNum); // 디버깅용 로그

  // 북마크 클릭 핸들러
  const handleBookmarkPress = () => {
    if (!menuIdNum) {
      Alert.alert('Error', 'Invalid menu ID.');
      return;
    }

    Alert.alert(
      '',
      isBookmarkedUI
        ? 'Remove this menu from bookmarks?'
        : 'Add this menu to bookmarks?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const newBookmarkState = !isBookmarkedUI;
            setIsBookmarkedUI(newBookmarkState);
            setIsApiLoading(true);

            try {
              // API 호출
              const response = await api.patch(`/menu/bookmark/${userId}`, {
                menuId: menuIdNum, // 추출된 menuId 사용
              });

              if (response.data.isBookmarked !== newBookmarkState) {
                throw new Error('Bookmark state mismatch');
              }

              onToggleBookmark(response.data.isBookmarked);
            } catch (error) {
              console.error('Bookmark update failed:', error);
              Alert.alert('Error', 'Failed to update bookmark.');
              setIsBookmarkedUI(!newBookmarkState); // 실패 시 원래 상태로 복구
            } finally {
              setIsApiLoading(false);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageLoadError(true);
  };

  // menu_id 확인 함수
  const hasMenuId = item.text && item.text.trim().startsWith('{');

  // 메시지에서 `{}` 제거
  const sanitizeMessage = (message: string): string => {
    return message.replace(/{.*?}/g, '').trim(); // `{}`와 내부 내용을 제거
  };

  // 텍스트 메시지 파싱 (볼드체 및 해시태그 스타일 적용)
  const renderParsedMessage = (message: string) => {
    const sanitizedMessage = sanitizeMessage(message);

    // 정규식: **볼드체**와 #해시태그 추출
    const boldAndHashtagRegex = /(\*\*(.*?)\*\*|#[^\s]+)/g;

    // 렌더링된 텍스트 추적용 Set
    const renderedTexts = new Set<string>();

    const parts = sanitizedMessage
      .split(boldAndHashtagRegex)
      .filter(part => part);
    const getMenuIdFromText = (text: string): number | null => {
      try {
        // JSON 형식일 경우, JSON 파싱 시도
        const parsed = JSON.parse(text);
        if (parsed.menu_id) {
          return parsed.menu_id;
        }
      } catch (error) {
        // JSON 파싱 실패 시 정규식으로 숫자 추출
        const match = text.match(/"menu_id"\s*:\s*(\d+)/);
        if (match && match[1]) {
          return parseInt(match[1], 10); // 숫자만 반환
        }
      }
      return null; // menu_id가 없을 경우
    };

    return parts.map((part, index) => {
      if (renderedTexts.has(part)) {
        // 이미 렌더링된 텍스트는 건너뛰기
        return null;
      }

      if (part.startsWith('#')) {
        // 해시태그 처리
        renderedTexts.add(part); // 해시태그 추가
        return (
          <Text key={index} style={styles.hashtagText}>
            {part}{' '}
          </Text>
        );
      } else if (part.startsWith('**') && part.endsWith('**')) {
        // **볼드체** 처리
        const content = part.slice(2, -2); // **를 제거
        renderedTexts.add(content); // 볼드 텍스트 추가
        return (
          <Text key={index} style={styles.boldText}>
            {content}
          </Text>
        );
      } else {
        // 일반 텍스트 처리
        renderedTexts.add(part); // 일반 텍스트 추가
        return (
          <Text key={index} style={styles.normalText}>
            {part}
          </Text>
        );
      }
    });
  };

  if (!item.text && !item.imageUri && !item.buttons?.length) {
    return null;
  }

  return (
    <View
      style={[
        styles.messageContainer,
        item.sentByUser ? styles.sentMessage : styles.receivedMessage,
        hasMenuId && {paddingTop: 45}, // 북마크 아이콘이 있을 때만 paddingTop 적용
      ]}>
      {/* 이미지 렌더링 */}
      {item.imageUri && (
        <View style={styles.imageContainer}>
          {isImageLoading && (
            <ActivityIndicator size="small" color={colors.GRAY_500} />
          )}

          <Image
            source={{uri: item.imageUri}}
            style={styles.image}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </View>
      )}

      {/* 북마크 아이콘 */}

      {hasMenuId && (
        <TouchableOpacity
          style={styles.bookmarkIcon}
          onPress={handleBookmarkPress}
          disabled={isApiLoading}
          hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          {isApiLoading ? (
            <ActivityIndicator size="small" color={colors.GRAY_500} />
          ) : (
            <Icon
              name={isBookmarkedUI ? 'bookmark' : 'bookmark-border'}
              size={40}
              color={isBookmarkedUI ? colors.ORANGE_500 : colors.GRAY_500}
            />
          )}
        </TouchableOpacity>
      )}

      {/* 메시지 텍스트 렌더링 */}
      <Text style={styles.messageText}>
        {renderParsedMessage(item.text || '')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    position: 'relative', // 북마크 아이콘 위치를 위한 설정
  },
  sentMessage: {
    backgroundColor: colors.YELLOW_200,
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: colors.GRAY_200,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  errorText: {
    color: colors.RED_500,
    textAlign: 'center',
    marginTop: 5,
  },
  messageText: {
    fontSize: 16,
    flexShrink: 1,
    color: colors.BLACK,
    // top: 45,
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  normalText: {
    fontWeight: 'normal',
    color: colors.BLACK,
  },
  hashtagText: {
    color: colors.ORANGE_800,
    fontWeight: 'bold',
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  bulletPoint: {
    marginRight: 6,
    fontSize: 16,
    color: colors.BLACK,
  },
  bulletText: {
    color: colors.BLACK,
    fontSize: 16,
  },
  bookmarkIcon: {
    position: 'absolute',
    //top: 5, // 상단 위치
    right: 5, // 오른쪽 위치
  },
});

export default MessageItem;
