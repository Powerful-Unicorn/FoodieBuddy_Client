import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {sendMessageToChatGPT} from '@/api/chat/openai';

const ChatScreen = () => {
  const [messages, setMessages] = useState<{sender: string; text: string}[]>(
    [],
  );
  const [inputText, setInputText] = useState<string>('');

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const newMessage = {sender: 'user', text: inputText};
    setMessages([...messages, newMessage]);

    setInputText('');

    const botReply = await sendMessageToChatGPT(inputText);
    setMessages([...messages, newMessage, {sender: 'bot', text: botReply}]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={
              message.sender === 'user' ? styles.userMessage : styles.botMessage
            }>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
