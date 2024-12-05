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
    wsRef.current = new WebSocket(url);
    wsRef.current.binaryType = 'blob';

    wsRef.current.onopen = () => {
      console.log(`WebSocket connected to ${url}`);
      setIsConnected(true);
      dispatch({type: WEBSOCKET_CONNECT});
    };
    wsRef.current.onmessage = async event => {
      if (event.data instanceof Blob) {
        // Blob 처리
        const imageUrl = URL.createObjectURL(event.data); // Blob 데이터를 URL로 변환
        onMessageReceived({type: 'image', imageUrl});
      } else if (typeof event.data === 'string') {
        // 텍스트 메시지 처리
        onMessageReceived({type: 'text', text: event.data});
      } else {
        console.warn('Unsupported WebSocket data type:', typeof event.data);
      }
    };

    wsRef.current.onclose = () => {
      setIsConnected(false);
      dispatch({type: WEBSOCKET_DISCONNECT});
    };

    return () => {
      wsRef.current?.close();
    };
  }, [url, dispatch]);

  const sendMessage = (message: any) => {
    if (wsRef.current && isConnected) {
      if (message instanceof ArrayBuffer) {
        wsRef.current.send(message);
      } else {
        wsRef.current.send(JSON.stringify(message));
      }
    }
  };

  return {isConnected, sendMessage};
}
