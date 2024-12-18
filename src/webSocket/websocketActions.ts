import {ThunkAction} from '@reduxjs/toolkit';
import {RootState} from '../states/store';
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
} from './websocketActionTypes';
import {MessageItem} from './websocketReducer';

let websocket: WebSocket | null = null;

// WebSocket 연결 액션
export const connectWebSocket = (
  url: string,
): ThunkAction<void, RootState, unknown, any> => {
  return dispatch => {
    if (websocket) {
      websocket.close();
    }

    websocket = new WebSocket(url);
    websocket.binaryType = 'blob';

    websocket.onopen = () => {
      console.log(`WebSocket connected to ${url}`);
      dispatch({type: WEBSOCKET_CONNECT});
    };

    websocket.onmessage = event => {
      const data = event.data;

      console.log('[WebSocket] Received data:', data); // 데이터 로깅
      console.log('[WebSocket] Data type:', typeof data);

      // 메시지 유형에 따라 MessageItem 생성
      const message: MessageItem =
        typeof data === 'string'
          ? {text: data, sentByUser: false} // 텍스트 메시지
          : {imageUri: URL.createObjectURL(data), sentByUser: false}; // 이미지 메시지

      console.log('[WebSocket] MessageItem created:', message);

      // Redux에 메시지 디스패치
      dispatch({type: WEBSOCKET_MESSAGE, payload: message});
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      dispatch({type: WEBSOCKET_DISCONNECT});
      websocket = null;
    };
  };
};

// WebSocket 메시지 전송 액션
export const sendWebSocketMessage = (
  message: any,
): ThunkAction<void, RootState, unknown, any> => {
  return () => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      if (message instanceof ArrayBuffer) {
        websocket.send(message); // 바이너리 데이터 전송
      } else {
        websocket.send(JSON.stringify(message)); // 문자열/JSON 전송
      }
    } else {
      console.error('WebSocket is not connected');
    }
  };
};

// WebSocket 연결 종료 액션
export const disconnectWebSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  any
> => {
  return dispatch => {
    if (websocket) {
      websocket.close();
      websocket = null;
    }
    dispatch({type: WEBSOCKET_DISCONNECT});
  };
};
