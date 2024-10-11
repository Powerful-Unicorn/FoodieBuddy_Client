import React, {useEffect, useRef} from 'react';
import {View, FlatList, StyleSheet, Text, Image} from 'react-native';
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
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket 연결 설정
    wsRef.current = new WebSocket(
      'ws://api.foodiebuddy.kro.kr:8000/recommendation',
    );
    // WebSocket이 바이너리 데이터를 Blob 형식으로 처리하도록 설정
    wsRef.current.binaryType = 'blob';

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      dispatch({type: WEBSOCKET_CONNECT});
    };

    // WebSocket에서 수신한 메시지 처리
    wsRef.current.onmessage = async event => {
      console.log('WebSocket message received (type): ', typeof event.data);
      console.log('WebSocket message received (data): ', event.data);

      if (typeof event.data === 'string') {
        // 텍스트 메시지 처리
        const parsedMessage = {
          text: event.data,
          sentByUser: false, // 상대방이 보낸 메시지로 가정
        };
        dispatch({type: WEBSOCKET_MESSAGE, payload: parsedMessage});
      } else if (event.data instanceof Blob) {
        // Blob 데이터를 URL로 변환하여 이미지 렌더링
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
        renderItem={({item}) =>
          item.imageUri ? (
            <Image source={{uri: item.imageUri}} style={styles.image} />
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default ChatScreen;
