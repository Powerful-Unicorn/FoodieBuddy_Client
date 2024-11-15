// states/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false, // 기본적으로 로그아웃 상태
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true; // 로그인 상태로 변경
    },
    logout(state) {
      state.isLoggedIn = false; // 로그아웃 상태로 변경
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
