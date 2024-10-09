// websocketReducer.ts
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
} from './websocketActionTypes'; // 액션 타입을 여기서 import

interface WebSocketState {
  isConnected: boolean;
  messages: string[];
}

const initialState: WebSocketState = {
  isConnected: false,
  messages: [],
};

export const websocketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT:
      return {
        ...state,
        isConnected: true,
      };
    case WEBSOCKET_DISCONNECT:
      return {
        ...state,
        isConnected: false,
      };
    case WEBSOCKET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
