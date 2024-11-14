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
  const [isImageLoading, setIsImageLoading] = useState(!!item.imageUri);
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageLoadError(true);
  };

  // 텍스트 메시지 파싱 (볼드체 및 해시태그 스타일 적용)
  const renderParsedMessage = (message: string) => {
    const bulletRegex = /^- ?(.*)/gm; // - 뒤 공백 허용
    const boldAndHashtagRegex = /(\*\*(.*?)\*\*|#[^\s]+)/g; // **(내용)** 또는 #해시태그 감지

    // 텍스트 분리
    const parts = message.split(
      new RegExp(`${bulletRegex.source}|${boldAndHashtagRegex.source}`, 'g'),
    );

    // 볼드체 텍스트를 추출하여 중복 제거 준비
    const boldTexts: string[] = [];
    message.replace(boldAndHashtagRegex, (match, _, boldText) => {
      if (boldText) boldTexts.push(boldText.trim());
      return match;
    });

    return parts
      .filter(part => part) // undefined 또는 빈 문자열 제거
      .map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const content = part.slice(2, -2).trim(); // ** 제거
          return (
            <Text key={index} style={styles.boldText}>
              {content}
            </Text>
          );
        } else if (part.startsWith('#')) {
          return (
            <Text key={index} style={styles.hashtagText}>
              {part}
            </Text>
          );
        } else if (part.startsWith('- ')) {
          return (
            <View key={index} style={styles.bulletContainer}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{part.slice(2).trim()}</Text>
            </View>
          );
        } else {
          // 중복 제거: 볼드체 텍스트와 동일한 내용이면 제외
          const isDuplicate = boldTexts.some(boldText =>
            part.trim().startsWith(boldText),
          );
          if (isDuplicate) {
            const cleanedText = boldTexts.reduce(
              (text, boldText) => text.replace(boldText, '').trim(),
              part.trim(),
            );
            return cleanedText ? (
              <Text key={index} style={styles.normalText}>
                {cleanedText}
              </Text>
            ) : null;
          }
          return (
            <Text key={index} style={styles.normalText}>
              {part.trim()}
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
      {item.text && (
        <Text style={styles.messageText}>{renderParsedMessage(item.text)}</Text>
      )}

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
  },
  boldText: {
    fontWeight: 'bold', // 볼드체 스타일
    color: colors.BLACK,
  },
  normalText: {
    fontWeight: 'normal',
    color: colors.BLACK,
  },
  hashtagText: {
    color: colors.ORANGE_800, // 해시태그 색상 변경
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
    color: colors.BLACK, // 불릿 텍스트 색상
    fontSize: 16,
  },
});

export default MessageItem;
