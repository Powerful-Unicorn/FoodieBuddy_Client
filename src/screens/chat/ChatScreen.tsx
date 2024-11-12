// ChatScreen.tsx
import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../states/store';
import MessageInput from '../../components/chat/MessageInput';
import ChatbotInstruction from '../../components/chat/ChatbotInstruction';
import {useWebSocket} from '../../webSocket/websocketHandler';

const ChatScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {messages} = useSelector((state: RootState) => state.websocket);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 웹소켓 메시지 수신 처리 함수
  const handleMessageReceived = (data: any) => {
    setLoading(false);

    const parsedMessage =
      typeof data === 'string'
        ? {text: data, sentByUser: false}
        : data instanceof Blob
        ? {imageUri: URL.createObjectURL(data), sentByUser: false}
        : null;

    if (parsedMessage) {
      dispatch({type: 'WEBSOCKET_MESSAGE', payload: parsedMessage});
    }
  };

  // 웹소켓 연결 및 메시지 전송 설정
  const {isConnected, sendMessage} = useWebSocket(
    currentUrl || '',
    handleMessageReceived,
  );

  // URL 변경 시 웹소켓 재연결
  const handleInstructionButtonPress = (url: string) => {
    setCurrentUrl(url);
    setLoading(true);
  };

  // 메시지 및 이미지 전송
  const handleSendMessage = (message: string, imageUri: string | null) => {
    setLoading(true);
    const payload = imageUri ? {imageUri, text: message} : message;
    sendMessage(payload);

    // 로컬 상태에 전송 메시지 추가
    dispatch({
      type: 'WEBSOCKET_MESSAGE',
      payload: {text: message, imageUri, sentByUser: true},
    });
  };

  return (
    <View style={styles.container}>
      {/* 웹소켓 연결 상태 메시지 */}
      {!isConnected && <Text style={styles.statusText}>Connecting...</Text>}

      {/* 채팅 메시지 리스트 */}
      <FlatList
        data={messages}
        renderItem={({item}) =>
          item.imageUri ? (
            <View
              style={item.sentByUser ? styles.userMessage : styles.botMessage}>
              <Image source={{uri: item.imageUri}} style={styles.image} />
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          ) : (
            <View
              style={item.sentByUser ? styles.userMessage : styles.botMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )
        }
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      {/* 로딩 표시 */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Sending...</Text>
        </View>
      )}

      <ChatbotInstruction onButtonPress={handleInstructionButtonPress} />
      <MessageInput
        onSend={(message, imageUri) => handleSendMessage(message, imageUri)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  statusText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
});

export default ChatScreen;
