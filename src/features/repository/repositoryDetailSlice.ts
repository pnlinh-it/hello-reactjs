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

export interface RepositoryDetailState {
  status: ApiStatus;
  item: RepositorySate;
  error: string;
}

export interface RepositorySate {
  id: number;
  owner: string;
  name: string;
  url: string;
  app_name: string;
  icon: string;
  branches: BranchState[];
  created_at: Date;
  updated_at: Date;
}

export interface BranchState {
  id: number;
  name: string;
  events: EventState[];
  created_at: Date;
}

export interface EventState {
  id: number;
  commit_message: string;
  commit_sha: string;
  created_at: Date;
}

const initialState: RepositoryDetailState = {
  status: ApiStatus.IDLE,
  item: {
    id: 0,
    owner: '',
    name: '',
    url: '',
    app_name: '',
    icon: '',
    branches: [],
    created_at: new Date(),
    updated_at: new Date(),
  },
  error: '',
};

export const fetchRepository = createAsyncThunk<RepositorySate, number>(
  'repository',
  async (repositoryId, thunkApi) => {
    try {
      const response = await client.get<RepositorySate>(`repositories/${repositoryId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const repositoryDetailSlice = createSlice({
  name: 'repository-detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(fetchRepository), (state) => {
        state.error = '';
        state.status = ApiStatus.LOADING;
      })
      .addMatcher(isFulfilled(fetchRepository), (state, action) => {
        state.error = '';
        state.status = ApiStatus.IDLE;
        state.item = action.payload;
      })
      .addMatcher(isRejected(fetchRepository), (state, action) => {
        state.status = ApiStatus.IDLE;
        const apiError = parseApiError(action.payload);
        state.error = apiError.message;
      });
  },
});

export default repositoryDetailSlice.reducer;
