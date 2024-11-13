import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../states/store';
import MessageInput from '../../components/chat/MessageInput';
import {useWebSocket} from '../../webSocket/websocketHandler';
import {colors} from '../../constants';

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
    {
      icon: '❓',
      text: 'Food Recommendation',
      apiUrl: 'ws://api.foodiebuddy.kro.kr:8000/recommendation',
    },
    {
      icon: '📋',
      text: 'Explain Menu Board',
      apiUrl: 'ws://api.foodiebuddy.kro.kr:8000/askmenu',
    },
    {
      icon: '🍳',
      text: 'Explain Side Dish',
      apiUrl: 'ws://api.foodiebuddy.kro.kr:8000/askdish',
    },
  ];

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

  const handleInstructionButtonPress = (apiUrl: string) => {
    setCurrentUrl(apiUrl);
    setLoading(true);
  };

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

  const renderButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.botMessage}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleInstructionButtonPress(button.apiUrl)}>
              <Text style={styles.buttonIcon}>{button.icon}</Text>
              <Text style={styles.buttonText}>{button.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isConnected && <Text style={styles.statusText}>Connecting...</Text>}

      {renderButtons()}

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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ORANGE_200,
    borderRadius: 50,
    padding: 10,
    margin: 5,
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
