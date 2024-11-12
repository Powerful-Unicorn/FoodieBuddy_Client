// WebSocketHandler.ts
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../states/store';
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_DISCONNECT,
} from '../webSocket/websocketActionTypes';

export function useWebSocket(
  url: string,
  onMessageReceived: (data: any) => void,
) {
  const wsRef = useRef<WebSocket | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // WebSocket 연결 설정
    wsRef.current = new WebSocket(url);
    wsRef.current.binaryType = 'blob';

    wsRef.current.onopen = () => {
      console.log(`WebSocket connected to ${url}`);
      setIsConnected(true);
      dispatch({type: WEBSOCKET_CONNECT});
    };

    wsRef.current.onmessage = event => {
      console.log('WebSocket message received:', event.data);
      onMessageReceived(event.data); // 수신된 메시지를 콜백 함수로 처리
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      dispatch({type: WEBSOCKET_DISCONNECT});
    };

    return () => {
      wsRef.current?.close();
    };
  }, [url, dispatch]);

  const sendMessage = (message: any) => {
    if (wsRef.current && isConnected) {
      wsRef.current.send(
        typeof message === 'string' ? message : JSON.stringify(message),
      );
    }
  };

  return {isConnected, sendMessage};
}
