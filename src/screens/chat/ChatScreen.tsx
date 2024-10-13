import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, StyleSheet, Text, Image} from 'react-native';
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
      setShowBotResponse(true); // Food Recommendation 버튼을 눌렀을 때만 메시지 받기
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

      <MessageInput
        onSend={message => {
          console.log('Message to send:', message);
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
});

export default ChatScreen;
