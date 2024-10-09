import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ChatbotInstruction from './ChatbotInstruction';

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
      {item.imageUri ? (
        <Image source={{uri: item.imageUri}} style={styles.image} />
      ) : null}
      {item.text ? <Text style={styles.messageText}>{item.text}</Text> : null}
      {item.buttons ? <ChatbotInstruction buttons={item.buttons} /> : null}
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
    backgroundColor: '#d1f7c4',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
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
