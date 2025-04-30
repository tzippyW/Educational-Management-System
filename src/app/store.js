

// import { configureStore } from '@reduxjs/toolkit'
// import chatReducer from '../features/Chat/chatSlice';
// import taskReducer from '../featuers/lecturer/taskSlice'
// import tasksReducer from '../features/tasks/tasksSlice'; 

// export const store = configureStore({
//   reducer: {
//      tasks: tasksReducer,
//      taskSlice:taskReducer,
//      Chatt: chatReducer
//   },
// })

import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/Chat/chatSlice';

export const store = configureStore({
  reducer: {
    Chatt: chatReducer,
  },
});


