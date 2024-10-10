import React, {useEffect, useRef} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../states/store';
import MessageItem from '../../components/chat/MessageItem';
import MessageInput from '../../components/chat/MessageInput';
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_DISCONNECT,
} from '../../webSocket/websocketActionTypes';

const ChatScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {isConnected, messages} = useSelector(
    (state: RootState) => state.websocket,
  );

  // WebSocket 객체를 useRef로 관리
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(
      'ws://api.foodiebuddy.kro.kr:8000/recommendation',
    );

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      dispatch({type: WEBSOCKET_CONNECT});
    };
    // WebSocket에서 수신한 메시지 처리
    wsRef.current.onmessage = event => {
      console.log('WebSocket message received: ', event.data);

      // 받은 데이터를 객체 형태로 변환하여 저장
      const parsedMessage = {
        text: event.data,
        sentByUser: false, // 상대방이 보낸 메시지로 가정
      };

      dispatch({type: WEBSOCKET_MESSAGE, payload: parsedMessage});
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket disconnected');
      dispatch({type: WEBSOCKET_DISCONNECT});
    };

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {!isConnected && (
        <Text style={styles.statusText}>Connecting to WebSocket...</Text>
      )}

      <FlatList
        data={messages}
        renderItem={({item}) => <MessageItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      <MessageInput
        onSend={message => {
          console.log('Message to send:', message);
          wsRef.current?.send(message); // WebSocket을 통해 메시지 전송

          // 내가 보낸 메시지를 바로 화면에 표시
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
});

export default ChatScreen;
