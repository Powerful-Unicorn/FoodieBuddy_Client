// websocketActions.ts
import {ThunkAction} from '@reduxjs/toolkit';
import {RootState} from '../states/store';
// websocketActions.ts
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
} from './websocketActionTypes';

export const connectWebSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  any
> => {
  return dispatch => {
    const ws = new WebSocket('ws://api.foodiebuddy.kro.kr:8000/recommendation');

    ws.onopen = () => {
      console.log('WebSocket connected');
      // 연결 상태만 업데이트
      dispatch({type: WEBSOCKET_CONNECT});
    };

    ws.onmessage = event => {
      console.log('WebSocket message received: ', event.data);
      dispatch({type: WEBSOCKET_MESSAGE, payload: event.data});
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      dispatch({type: WEBSOCKET_DISCONNECT});
    };
  };
};
