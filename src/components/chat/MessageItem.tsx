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

interface MessageItemProps {
  item: {
    text?: string; // 텍스트 메시지 (선택적)
    imageUri?: string; // 이미지 URI (선택적)
    sentByUser?: boolean; // 사용자 메시지 여부 (선택적)
    buttons?: string[]; // 버튼 목록 (선택적)
  };
  isBookmarked?: boolean; // 북마크 상태
  onToggleBookmark: (bookmarked: boolean) => void; // 북마크 상태 변경 핸들러
}

const MessageItem: React.FC<MessageItemProps> = ({
  item,
  isBookmarked = false, // 부모로부터 북마크 상태 전달받음
  onToggleBookmark, // 부모로부터 북마크 상태 변경 핸들러 전달받음
}) => {
  const [isImageLoading, setIsImageLoading] = useState(!!item.imageUri);
  const [imageLoadError, setImageLoadError] = useState(false);

  // 북마크 클릭 핸들러
  const handleBookmarkPress = () => {
    Alert.alert(
      '',
      isBookmarked
        ? 'Remove this menu from bookmarks?'
        : 'Add this menu to bookmarks?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',

          onPress: () => {
            onToggleBookmark(!isBookmarked);
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
    const boldAndHashtagRegex = /(\*\*(.*?)\*\*|#[^\s]+)/g;

    const parts = sanitizedMessage
      .split(boldAndHashtagRegex)
      .filter(part => part);

    // 중복 제거를 위한 Set
    const renderedBoldTexts = new Set<string>();

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // **볼드체 텍스트** 처리
        const content = part.slice(2, -2).trim();
        if (!renderedBoldTexts.has(content)) {
          renderedBoldTexts.add(content);
          return (
            <Text key={index} style={styles.boldText}>
              {content}
            </Text>
          );
        }
        return null; // 중복된 경우 렌더링하지 않음
      } else if (part.startsWith('#')) {
        // #해시태그 처리
        return (
          <Text key={index} style={styles.hashtagText}>
            {part}
          </Text>
        );
      } else {
        // 일반 텍스트 처리 및 줄바꿈 유지
        const lines = part.split('\n');
        return lines.map((line, lineIndex) => {
          const trimmedLine = line.trim();

          if (!renderedBoldTexts.has(trimmedLine)) {
            renderedBoldTexts.add(trimmedLine);
            return (
              <React.Fragment key={`line-${index}-${lineIndex}`}>
                <Text style={styles.normalText}>{trimmedLine}</Text>
                {lineIndex < lines.length - 1 && (
                  // 줄바꿈과 한 줄 띄어쓰기를 추가
                  <Text style={styles.normalText}>{'\n\n'}</Text>
                )}
              </React.Fragment>
            );
          }
          return null; // 중복된 경우 렌더링하지 않음
        });
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
          {imageLoadError ? (
            <Text style={styles.errorText}>이미지를 로드할 수 없습니다.</Text>
          ) : (
            <Image
              source={{uri: item.imageUri}}
              style={styles.image}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </View>
      )}

      {/* 북마크 아이콘 */}

      {hasMenuId && (
        <TouchableOpacity
          style={styles.bookmarkIcon}
          onPress={handleBookmarkPress}
          hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}>
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-border'}
            size={40}
            color={isBookmarked ? colors.ORANGE_500 : colors.GRAY_500}
          />
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
