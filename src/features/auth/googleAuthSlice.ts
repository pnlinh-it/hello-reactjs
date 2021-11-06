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
import { LoginResponse } from './authSlice';
import { STORAGE_KEY_TOKEN } from '../../common/constant';

export interface GoogleAuthState {
  status: ApiStatus;
  redirectUrl: RedirectUrlState;
  error: string;
}

export interface RedirectUrlState {
  url: string;
}

const initialState: GoogleAuthState = {
  status: ApiStatus.IDLE,
  redirectUrl: {
    url: '',
  },
  error: '',
};

export interface GoogleRedirectUrlResponse {
  url: string;
}

export const googleRedirectUrl = createAsyncThunk(
  'auth/google/redirect-url',
  async (_, thunkApi) => {
    try {
      const response = await client.get<GoogleRedirectUrlResponse>('auth/google/redirect-url');
      return response.data as GoogleRedirectUrlResponse;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export interface LoginGoogleRequest {
  [key: string]: string;
}
export const loginGoogleCallback = createAsyncThunk<LoginResponse, LoginGoogleRequest>(
  'auth/google/callback',
  async (loginRequest: LoginGoogleRequest, thunkApi) => {
    try {
      const response = await client.get<LoginResponse>('auth/google/callback', {
        params: loginRequest,
      });
      const loginResponse = response.data as LoginResponse;
      localStorage.setItem(STORAGE_KEY_TOKEN, loginResponse.token);
      return loginResponse;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const googleAuthSlice = createSlice({
  name: 'google-auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(googleRedirectUrl), (state) => {
        state.error = '';
        state.status = ApiStatus.LOADING;
      })
      .addMatcher(isFulfilled(googleRedirectUrl), (state, action) => {
        state.error = '';
        state.redirectUrl = action.payload;
        state.status = ApiStatus.IDLE;
      })
      .addMatcher(isRejected(googleRedirectUrl), (state, action) => {
        state.status = ApiStatus.IDLE;
        const apiError = parseApiError(action.payload);
        state.error = apiError.message;
      });
  },
});

export default googleAuthSlice.reducer;
