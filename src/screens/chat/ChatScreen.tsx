import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../states/store';
import MessageInput from '../../components/chat/MessageInput';
import {useWebSocket} from '../../webSocket/websocketHandler';
import {colors} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessageItem from '../../components/chat/MessageItem';

type MessageItemType = {
  text?: string;
  sentByUser: boolean;
  imageUri?: string;
};

const ChatScreen: React.FC<{route: any}> = ({route}) => {
  const dispatch = useDispatch();
  const {messages} = useSelector((state: RootState) => state.websocket);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const buttons = [
    {
      icon: 'question-mark',
      text: 'Recommend Food',
      apiUrl: 'ws://api.foodiebuddy.kro.kr:8000/recommendation',
    },
    {
      icon: 'menu-book',
      text: 'Explain\nMenu Board',
      apiUrl: 'ws://api.foodiebuddy.kro.kr:8000/askmenu',
    },
    {
      icon: 'egg-alt',
      text: 'Explain\nSide Dish',
      apiUrl: 'ws://api.foodiebuddy.kro.kr:8000/askdish',
    },
  ];

  const {isConnected, sendMessage} = useWebSocket(
    currentUrl || '',
    (data: any) => {
      setLoading(false);
      const parsedMessage: MessageItemType =
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

    const payload: MessageItemType = {
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

  const renderButtons = () => (
    <View style={styles.buttonRow}>
      {buttons.map((button, index) => (
        <View key={index} style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleInstructionButtonPress(button.apiUrl)}>
            <Icon name={button.icon} size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>{button.text}</Text>
        </View>
      ))}
    </View>
  );

  const showInstruction = route.params?.showInstruction ?? true;

  return (
    <View style={styles.container}>
      {!isConnected && <Text style={styles.statusText}>Connecting...</Text>}

      {showInstruction && renderButtons()}

      <FlatList
        data={messages}
        renderItem={({item}) => <MessageItem item={item} />}
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonWrapper: {
    alignItems: 'center',
    maxWidth: 100,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.ORANGE_200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    lineHeight: 15,
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
