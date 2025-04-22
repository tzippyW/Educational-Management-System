import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../featuers/taskes/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});