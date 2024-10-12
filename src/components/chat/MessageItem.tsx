import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import ChatbotInstruction from './ChatbotInstruction';
import {colors} from '../../constants';

interface MessageItemProps {
  item: {
    text?: string;
    imageUri?: string;
    sentByUser?: boolean;
    buttons?: string[];
  };
}

const MessageItem: React.FC<MessageItemProps> = ({item}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageLoadError(true);
  };

  return (
    <View
      style={[
        styles.messageContainer,
        item.sentByUser ? styles.sentMessage : styles.receivedMessage,
      ]}>
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
      {item.text && <Text style={styles.messageText}>{item.text}</Text>}
      {item.buttons && <ChatbotInstruction buttons={item.buttons} />}
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
    marginBottom: 5, // 이미지와 텍스트 사이의 간격을 추가
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
    flexShrink: 1, // 긴 텍스트가 있을 경우 줄바꿈을 처리하기 위해 추가
  },
});

export default MessageItem;
