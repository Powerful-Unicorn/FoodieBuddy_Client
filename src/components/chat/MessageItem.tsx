import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
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

function MessageItem({item}: MessageItemProps) {
  return (
    <View
      style={[
        styles.messageContainer,
        item.sentByUser ? styles.sentMessage : styles.receivedMessage,
      ]}>
      {item.imageUri && (
        <Image source={{uri: item.imageUri}} style={styles.image} />
      )}
      {item.text && <Text style={styles.messageText}>{item.text}</Text>}
      {item.buttons && <ChatbotInstruction buttons={item.buttons} />}
    </View>
  );
}

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
    width: 500,
  },
  messageText: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default MessageItem;
