import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import client from '../../app/axios-base';
import { parseApiError } from '../../utils/api/error';
import { ApiStatus } from '../../common/api/ApiStatus';
import { loginGoogleCallback } from './googleAuthSlice';
import { STORAGE_KEY_TOKEN } from '../../common/constant';

export interface AuthState {
  status: ApiStatus;
  isLogin: boolean;
  user: UserSate;
  error: string;
}

export interface UserSate {
  id: number;
  name: string;
  avatar: string;
}

const token = localStorage.getItem(STORAGE_KEY_TOKEN);

const initialState: AuthState = {
  status: ApiStatus.IDLE,
  isLogin: !!token,
  user: {
    id: 0,
    name: '',
    avatar: '',
  },
  error: '',
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  token: string;
}

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  'auth/login/password',
  async (loginRequest: LoginRequest, thunkApi) => {
    try {
      const response = await client.post<LoginResponse>('auth/login/password', loginRequest);
      const loginResponse = response.data as LoginResponse;
      localStorage.setItem(STORAGE_KEY_TOKEN, loginResponse.token);
      return loginResponse;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(login, loginGoogleCallback), (state) => {
        state.error = '';
        state.isLogin = false;
        state.status = ApiStatus.LOADING;
      })
      .addMatcher(isFulfilled(login, loginGoogleCallback), (state, action) => {
        action.payload.id;
        state.error = '';
        state.isLogin = true;
        state.status = ApiStatus.IDLE;
      })
      .addMatcher(isRejected(login, loginGoogleCallback), (state, action) => {
        state.isLogin = false;
        state.status = ApiStatus.IDLE;
        const apiError = parseApiError(action.payload);
        state.error = apiError.message;
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
