import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import ChatbotInstruction from './ChatbotInstruction';
import {colors} from '../../constants';

interface MessageItemProps {
  item: {
    text?: string; // 텍스트 메시지 (선택적)
    imageUri?: string; // 이미지 URI (선택적)
    sentByUser?: boolean; // 사용자 메시지 여부 (선택적)
    buttons?: string[]; // 버튼 목록 (선택적)
  };
}

const MessageItem: React.FC<MessageItemProps> = ({item}) => {
  const [isImageLoading, setIsImageLoading] = useState(!!item.imageUri); // 이미지 로드 중 상태
  const [imageLoadError, setImageLoadError] = useState(false); // 이미지 로드 에러 상태

  // 이미지 로드 성공 핸들러
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // 이미지 로드 실패 핸들러
  const handleImageError = () => {
    setIsImageLoading(false);
    setImageLoadError(true);
  };

  // 렌더링할 데이터가 없는 경우 처리
  if (!item.text && !item.imageUri && !item.buttons?.length) {
    return null; // 텍스트, 이미지, 버튼이 없는 경우 렌더링하지 않음
  }

  return (
    <View
      style={[
        styles.messageContainer,
        item.sentByUser ? styles.sentMessage : styles.receivedMessage,
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

      {/* 텍스트 메시지 렌더링 */}
      {item.text && <Text style={styles.messageText}>{item.text}</Text>}

      {/* 버튼 렌더링 */}
      {item.buttons && item.buttons.length > 0 && (
        <ChatbotInstruction buttons={item.buttons} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
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
    marginBottom: 5, // 이미지와 텍스트 사이의 간격 추가
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
    flexShrink: 1, // 긴 텍스트가 있을 경우 줄바꿈 처리
  },
});

export default MessageItem;
