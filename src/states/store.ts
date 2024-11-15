import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import {websocketReducer} from '../webSocket/websocketReducer';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // 기존 user 리듀서
    websocket: websocketReducer, // websocket 리듀서 추가
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
