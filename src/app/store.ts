import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import googleAuthReducer from '../features/auth/googleAuthSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    googleAuth: googleAuthReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
