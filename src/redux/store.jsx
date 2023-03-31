import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './action/auth.jsx';
import authReducer from './reducer/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    // userOnline: updateUserActive,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(apiSlice.middleware),
  devTools: true,
});
