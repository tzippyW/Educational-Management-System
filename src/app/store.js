import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../features/Chat/chatSlice';
import taskReducer from '../featuers/lecturer/taskSlice'

export const store = configureStore({
  reducer: {
     taskSlice:taskReducer,
     chat: chatReducer
  },
})

