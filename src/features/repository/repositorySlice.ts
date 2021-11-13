import { ApiStatus } from '../../common/api/ApiStatus';
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import client from '../../app/axios-base';
import { parseApiError } from '../../utils/api/error';

export interface RepositoriesState {
  status: ApiStatus;
  items: RepositorySate[];
  error: string;
}

export interface RepositorySate {
  id: number;
  owner: string;
  name: string;
  url: string;
  app_name: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
}

const initialState: RepositoriesState = {
  status: ApiStatus.IDLE,
  items: [],
  error: '',
};

export interface RepositoriesResponse {
  data: RepositorySate[];
}

export const fetchRepositories = createAsyncThunk<RepositorySate[]>(
  'repositories',
  async (_, thunkApi) => {
    try {
      const response = await client.get<RepositoriesResponse>('repositories');
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(fetchRepositories), (state) => {
        state.error = '';
        state.status = ApiStatus.LOADING;
      })
      .addMatcher(isFulfilled(fetchRepositories), (state, action) => {
        state.error = '';
        state.status = ApiStatus.IDLE;
        state.items = action.payload;
      })
      .addMatcher(isRejected(fetchRepositories), (state, action) => {
        state.status = ApiStatus.IDLE;
        const apiError = parseApiError(action.payload);
        state.error = apiError.message;
      });
  },
});

export default repositoriesSlice.reducer;
