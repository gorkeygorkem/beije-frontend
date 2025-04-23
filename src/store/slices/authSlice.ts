// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileInfo {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  passwordHash: string;
}

interface AuthState {
  token: string | null;
  profile: ProfileInfo | null;
}

const initialState: AuthState = {
  token: null,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setProfile(state, action: PayloadAction<ProfileInfo>) {
      state.profile = action.payload;
    },
    logout(state) {
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setToken, setProfile, logout } = authSlice.actions;
export default authSlice.reducer;
