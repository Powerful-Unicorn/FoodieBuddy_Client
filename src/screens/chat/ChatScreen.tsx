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

// MessageItem 타입 정의
type MessageItem = {
  text?: string;
  sentByUser: boolean;
  imageUri?: string;
};

const ChatScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {messages} = useSelector((state: RootState) => state.websocket);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 버튼 목록
  const buttons = [
    'Menu recommendation',
    'Upload menu photo',
    'Upload dish photo',
  ];

  // 버튼 클릭 핸들러
  const handleInstructionButtonPress = (button: string) => {
    let apiUrl = '';

    switch (button) {
      case 'Menu recommendation':
        apiUrl = 'ws://api.foodiebuddy.kro.kr:8000/recommendation'; // 웹소켓 API 1
        break;
      case 'Upload menu photo':
        apiUrl = 'ws://api.foodiebuddy.kro.kr:8000/askmenu'; // 웹소켓 API 2
        break;
      case 'Upload dish photo':
        apiUrl = 'ws://api.foodiebuddy.kro.kr:8000/askdish'; // 웹소켓 API 3
        break;
      default:
        console.error('Unknown button action:', button);
        return;
    }

    setCurrentUrl(apiUrl);
    setLoading(true);
  };

  const {isConnected, sendMessage} = useWebSocket(
    currentUrl || '',
    (data: any) => {
      setLoading(false);

      const parsedMessage: MessageItem =
        typeof data === 'string'
          ? {text: data, sentByUser: false}
          : {text: '', sentByUser: false};

      dispatch({type: 'WEBSOCKET_MESSAGE', payload: parsedMessage});
    },
  );

  const handleSendMessage = (
    message: string,
    imageUri: string | null,
    binaryData: ArrayBuffer | null,
  ) => {
    setLoading(true);

    if (binaryData) {
      sendMessage(binaryData);
    }

    const payload: MessageItem = {
      text: message,
      imageUri: imageUri || undefined,
      sentByUser: true,
    };

    dispatch({
      type: 'WEBSOCKET_MESSAGE',
      payload,
    });

    if (message.trim()) {
      sendMessage(payload);
    }
  };

  return (
    <View style={styles.container}>
      {!isConnected && <Text style={styles.statusText}>Connecting...</Text>}

      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View
            style={item.sentByUser ? styles.userMessage : styles.botMessage}>
            {item.imageUri && (
              <Image source={{uri: item.imageUri}} style={styles.image} />
            )}
            {item.text && <Text style={styles.messageText}>{item.text}</Text>}
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Sending...</Text>
        </View>
      )}

      <ChatbotInstruction
        buttons={buttons} // 버튼 목록 전달
        onButtonPress={handleInstructionButtonPress} // 클릭 핸들러 전달
      />
      <MessageInput
        onSend={(message, imageUri, binaryData) =>
          handleSendMessage(message, imageUri, binaryData)
        }
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
