

import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/Chat/chatSlice';

export const store = configureStore({
  reducer: {
    Chatt: chatReducer,
  },
});


