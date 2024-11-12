// websocketActions.ts
import {ThunkAction} from '@reduxjs/toolkit';
import {RootState} from '../states/store';
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
} from './websocketActionTypes';

// WebSocket 인스턴스를 관리하기 위한 전역 변수
let websocket: WebSocket | null = null;

// URL을 받아서 WebSocket을 연결하는 액션
export const connectWebSocket = (
  url: string,
): ThunkAction<void, RootState, unknown, any> => {
  return dispatch => {
    // 기존 WebSocket 연결이 있으면 닫기
    if (websocket) {
      websocket.close();
    }

    // 새로운 WebSocket 인스턴스 생성
    websocket = new WebSocket(url);

    websocket.onopen = () => {
      console.log(`WebSocket connected to ${url}`);
      dispatch({type: WEBSOCKET_CONNECT});
    };

    websocket.onmessage = event => {
      console.log('WebSocket message received:', event.data);
      dispatch({type: WEBSOCKET_MESSAGE, payload: event.data});
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      dispatch({type: WEBSOCKET_DISCONNECT});
      websocket = null;
    };
  };
};

// WebSocket 연결을 닫는 액션
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
