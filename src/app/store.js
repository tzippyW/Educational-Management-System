

import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../features/Chat/chatSlice';
import taskReducer from '../featuers/lecturer/taskSlice'
import tasksReducer from '../features/tasks/tasksSlice'; 
import registrationReducer from '../features/registration/registrationSlice';

export const store = configureStore({
  reducer: {
     tasks: tasksReducer,
     taskSlice:taskReducer,
     chat: chatReducer,
     registration: registrationReducer, 

  },
})

