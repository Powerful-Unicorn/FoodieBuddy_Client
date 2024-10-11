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
import RNFetchBlob from 'react-native-blob-util';

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

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      dispatch({type: WEBSOCKET_CONNECT});
    };

    // WebSocket에서 수신한 메시지 처리
    wsRef.current.onmessage = async event => {
      console.log('WebSocket message received: ', event.data);

      if (typeof event.data === 'string') {
        // 텍스트 메시지 처리
        const parsedMessage = {
          text: event.data,
          sentByUser: false, // 상대방이 보낸 메시지로 가정
        };
        dispatch({type: WEBSOCKET_MESSAGE, payload: parsedMessage});
      } else if (event.data instanceof ArrayBuffer) {
        // 이미지 데이터가 ArrayBuffer로 수신된 경우 처리
        const base64Image = await arrayBufferToBase64(event.data);
        const imageMessage = {
          imageUri: `data:image/png;base64,${base64Image}`,
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

  // ArrayBuffer를 Base64로 변환하는 함수 (react-native-blob-util 사용)
  const arrayBufferToBase64 = async (buffer: ArrayBuffer): Promise<string> => {
    const binary = String.fromCharCode.apply(
      null,
      new Uint8Array(buffer) as unknown as number[],
    );
    const base64 = RNFetchBlob.base64.encode(binary);
    return base64;
  };

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
