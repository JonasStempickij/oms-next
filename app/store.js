import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';
import authReducer from '../features/auth/authSlice';

export function makeStore() {
  return configureStore({
    reducer: { jobState: jobsReducer, authState: authReducer },
  });
}

const store = makeStore();

export default store;
