import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
} from './websocketActionTypes';

// MessageItem 타입 정의
export type MessageItem = {
  text?: string; // 선택적 속성으로 변경
  sentByUser: boolean;
  imageUri?: string;
};

// WebSocketState 타입 정의
interface WebSocketState {
  isConnected: boolean;
  messages: MessageItem[];
}

// 초기 상태
const initialState: WebSocketState = {
  isConnected: false,
  messages: [],
};

// WebSocket 리듀서
export const websocketReducer = (
  state = initialState,
  action: {type: string; payload?: any},
): WebSocketState => {
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
