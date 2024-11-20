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
  isBookmarked?: boolean;
};

const ChatScreen: React.FC<{route: any}> = ({route}) => {
  const userId = route.params?.userId;

  // 디버깅용 로그 추가
  React.useEffect(() => {
    console.log('[ChatScreen] Loaded with userId:', userId);
    if (!userId) {
      console.warn('[ChatScreen] No userId received.');
    }
  }, [userId]);
  const dispatch = useDispatch();
  const {messages: websocketMessages} = useSelector(
    (state: RootState) => state.websocket,
  );
  const [messages, setMessages] = useState<MessageItemType[]>([]); // 메시지 상태 관리
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 웹소켓에서 전달받은 메시지 상태를 동기화
  React.useEffect(() => {
    const updatedMessages = websocketMessages.map(message => ({
      ...message,
      isBookmarked: false, //
    }));
    setMessages(updatedMessages);
  }, [websocketMessages]);

  // 북마크 상태 토글 핸들러
  const toggleBookmark = (index: number, isBookmarked: boolean) => {
    setMessages(prevMessages =>
      prevMessages.map((message, i) =>
        i === index ? {...message, isBookmarked} : message,
      ),
    );
  };

  const buttons = [
    {
      icon: 'question-mark',
      text: 'Recommend Food',
      apiUrl: `ws://api.foodiebuddy.kro.kr:8000/recommendation/${userId}`,
    },
    {
      icon: 'menu-book',
      text: 'Explain\nMenu Board',
      apiUrl: `ws://api.foodiebuddy.kro.kr:8000/askmenu/${userId}`,
    },
    {
      icon: 'egg-alt',
      text: 'Explain\nSide Dish',
      apiUrl: `ws://api.foodiebuddy.kro.kr:8000/askdish/${userId}`,
    },
  ];

  // 웹소켓 연결 및 메시지 전송
  const {isConnected, sendMessage} = useWebSocket(
    currentUrl || '',
    (data: any) => {
      setLoading(false);
      const parsedMessage: MessageItemType =
        typeof data === 'string'
          ? {text: data, sentByUser: false, isBookmarked: false}
          : {text: '', sentByUser: false, isBookmarked: false};
      dispatch({type: 'WEBSOCKET_MESSAGE', payload: parsedMessage});
    },
  );

  // 버튼 클릭 시 웹소켓 URL 설정
  const handleInstructionButtonPress = (apiUrl: string) => {
    setCurrentUrl(apiUrl);
    setLoading(true);
  };

  // 메시지 전송 핸들러
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
      isBookmarked: false, // 초기 북마크 상태
    };

    // Redu

    dispatch({
      type: 'WEBSOCKET_MESSAGE',
      payload,
    });

    if (message.trim()) {
      sendMessage(payload);
    }
  };

  // 버튼 렌더링
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
      {/* 연결 상태 표시 */}
      {!isConnected && <Text style={styles.statusText}>Connecting...</Text>}

      {/* 안내 버튼 */}
      {showInstruction && renderButtons()}

      {/* 메시지 목록 렌더링 */}
      <FlatList
        data={messages}
        renderItem={({item, index}) => (
          <MessageItem
            item={item}
            isBookmarked={item.isBookmarked}
            onToggleBookmark={isBookmarked =>
              toggleBookmark(index, isBookmarked)
            }
          />
        )}
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

      {/* 메시지 입력 */}
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
