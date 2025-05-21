

import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/Chat/chatSlice';
import chatManagerReducer from '../features/Chat/chatManagerSlice';

export const store = configureStore({
  reducer: {
    Chatt: chatReducer,
    chatManager: chatManagerReducer,
  },
});


