

import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../features/Chat/chatSlice';
import taskReducer from '../featuers/lecturer/taskSlice'
import tasksReducer from '../features/tasks/tasksSlice'; 
export const store = configureStore({
  reducer: {
     tasks: tasksReducer,
     taskSlice:taskReducer,
     chat: chatReducer
  },
})
// בדיקה אם זה נדחף לגיט

