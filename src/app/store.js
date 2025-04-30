

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
<<<<<<< HEAD

export const store = configureStore({
  reducer: {
    Chatt: chatReducer,
=======
import taskReducer from '../featuers/lecturer/taskSlice'
import tasksReducer from '../features/tasks/tasksSlice'; 
import registrationReducer from '../features/registration/registrationSlice';
import chatReducer from '../features/Chat/chatSlice';

export const store = configureStore({
  reducer: {
     tasks: tasksReducer,
     taskSlice:taskReducer,
     Chatt: chatReducer,
     registration: registrationReducer, 

>>>>>>> 56a994e0fe7b48852ff3fde4a17ce7638cc57d97
  },
});


