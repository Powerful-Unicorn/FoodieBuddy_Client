import React, {useEffect, useRef} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {connectWebSocket} from '../../webSocket/websocketActions';
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

    wsRef.current.onmessage = event => {
      console.log('WebSocket message received: ', event.data);
      dispatch({type: WEBSOCKET_MESSAGE, payload: event.data});
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
          // WebSocket을 통해 메시지 전송 가능 (추가 구현 필요)
          console.log('Message to send:', message);
          wsRef.current?.send(message); // WebSocket을 통해 메시지 전송
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
