import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';

export function makeStore() {
    return configureStore({
        reducer: { jobState: jobsReducer },
    });
}

const store = makeStore();

export default store;
