import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../states/store';
import MessageItem from '../../components/chat/MessageItem';
import MessageInput from '../../components/chat/MessageInput';
import ChatbotInstruction from '../../components/chat/ChatbotInstruction';
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_DISCONNECT,
} from '../../webSocket/websocketActionTypes';
import {RouteProp} from '@react-navigation/native';
import {MainDrawerParamList} from '../../navigations/drawer/MainDrawerNavigator';

interface ChatScreenProps {
  route: RouteProp<MainDrawerParamList, 'Chat'>;
}

const ChatScreen: React.FC<ChatScreenProps> = ({route}) => {
  const dispatch: AppDispatch = useDispatch();
  const {isConnected, messages} = useSelector(
    (state: RootState) => state.websocket,
  );
  const wsRef = useRef<WebSocket | null>(null);
  const [showBotResponse, setShowBotResponse] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    // WebSocket 연결 설정
    wsRef.current = new WebSocket(
      'ws://api.foodiebuddy.kro.kr:8000/recommendation',
    );
    wsRef.current.binaryType = 'blob';

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      dispatch({type: WEBSOCKET_CONNECT});
    };

    wsRef.current.onmessage = async event => {
      console.log('WebSocket message received (type): ', typeof event.data);
      console.log('WebSocket message received (data): ', event.data);

      // 응답을 받았으므로 로딩 상태를 false로 설정
      setLoading(false);

      if (showBotResponse && typeof event.data === 'string') {
        const parsedMessage = {
          text: event.data,
          sentByUser: false,
        };
        dispatch({type: WEBSOCKET_MESSAGE, payload: parsedMessage});
      } else if (showBotResponse && event.data instanceof Blob) {
        const imageUrl = URL.createObjectURL(event.data);
        const imageMessage = {
          imageUri: imageUrl,
          sentByUser: false,
        };
        dispatch({type: WEBSOCKET_MESSAGE, payload: imageMessage});
      }
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket disconnected');
      dispatch({type: WEBSOCKET_DISCONNECT});
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [dispatch, showBotResponse]);

  // 처음 화면에 접속할 때 메시지가 한 번만 추가
  useEffect(() => {
    if (messages.length === 0) {
      addInstructionMessage(); // 메시지가 없을 때만 추가
    }
  }, [messages]);

  // "+" 버튼을 눌렀을 때 메시지 추가
  useEffect(() => {
    if (route.params?.showInstruction) {
      addInstructionMessage();
    }
  }, [route.params?.showInstruction]);

  const addInstructionMessage = () => {
    const instructionMessage = {
      id: Date.now().toString(),
      buttons: [
        'Food Recommendation',
        'Upload Menu Photo',
        'Upload Dish Photo',
      ],
      sentByUser: false,
    };
    dispatch({type: WEBSOCKET_MESSAGE, payload: instructionMessage});
  };

  const handleInstructionButtonPress = (button: string) => {
    if (button === 'Food Recommendation') {
      setShowBotResponse(true);
      setLoading(true); // 로딩 시작
    }
    console.log(`${button} 버튼이 클릭됨`);
    // 각 버튼 클릭 시 다른 로직 추가 가능
  };

  return (
    <View style={styles.container}>
      {!isConnected && <Text style={styles.statusText}>Connecting...</Text>}

      <FlatList
        data={messages}
        renderItem={({item}) =>
          item.imageUri ? (
            <Image source={{uri: item.imageUri}} style={styles.image} />
          ) : item.buttons ? (
            <ChatbotInstruction
              buttons={item.buttons}
              onButtonPress={handleInstructionButtonPress} // onButtonPress 전달
            />
          ) : (
            <MessageItem item={item} />
          )
        }
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      {/* 로딩 상태일 때 "Generating response" 메시지 표시 */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Generating response...</Text>
        </View>
      )}

      <MessageInput
        onSend={message => {
          console.log('Message to send:', message);

          // 사용자가 메시지를 보냈으므로 로딩 상태로 전환
          setLoading(true);

          wsRef.current?.send(message);

          const sentMessage = {
            text: message,
            sentByUser: true,
          };

          dispatch({type: WEBSOCKET_MESSAGE, payload: sentMessage});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
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
