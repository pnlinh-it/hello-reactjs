import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../app/axios-base';
import { AxiosError } from 'axios';
import { LoginResponse } from '../counter/counterSlice';

export interface AuthState {
  status: string;
  isLogin: boolean;
  user: UserSate;
}

export interface UserSate {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

const token = localStorage.getItem('token');

const initialState: AuthState = {
  status: 'idle',
  isLogin: !!token,
  user: {
    id: 0,
    name: '',
    username: '',
    avatar: '',
  },
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// https://stackoverflow.com/a/62368375/14284081
// https://blog.bitsrc.io/simplifying-redux-with-redux-toolkit-6236c28cdfcb
export const incrementAsync = createAsyncThunk<number, number>(
  'counter/fetchCount',
  async (amount: number, thunkApi) => {
    //const response = await fetchCount(amount);
    //const data = await fetch('https://keyon.edu.vn/api/quizzes')
    //const length = JSON.parse(await data.text()).data.length
    // The value we return becomes the `fulfilled` action payload

    try {
      const response = await client.post<LoginResponse>('auth/login', {
        username: 'pnlinh.it@gmail.com',
        password: '12121212',
      });
      console.log(response);
    } catch (error: any | AxiosError) {
      if (!error.response) {
        throw error;
      }
      console.log(error.response.data);
    }

    return 1;

    // return client
    //   .post<LoginResponse>('auth/login', {
    //     username: '',
    //     password: ''
    //   })
    //   .then(response => response.data)
    //   .catch(error => thunkApi.rejectWithValue(error))
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state, { meta }) => {
        // state[meta.arg.uid] = {loading: 'pending', 'success': false, message: undefined}
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        // state[action.meta.arg.uid] = {loading: 'done', 'success': true, message: action.payload.error.message}
        console.log(action.payload);
        state.status = 'idle';
        //state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default authSlice.reducer;
