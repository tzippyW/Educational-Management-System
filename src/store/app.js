

import { configureStore } from '@reduxjs/toolkit'
import eventReducer from "../features/events/EventsSlice";
import updateReducer from "../features/update/UpdatesSlice";
import usersReducer from '../features/Users/usersSlice';
import userActivityReducer from '../features/Users/userActivity/userActivitySlice';
import tasksReducer from '../features/tasks/tasksSlice';
import ListSlice from '../features/Items/ListSlice.js'; // ודאי שהשם כאן תואם גם בקובץ עצמו
import taskSlice from '../features/lecturer/taskSlice'
import questionSlice from '../features/lecturer/questionSlice'
import attendanceReduce from '../features/Attendance/attendanceSlice'


export const store = configureStore({
  reducer: {
         events: eventReducer,
         updates: updateReducer,
         users: usersReducer,
         userActivity: userActivityReducer,
         tasks: tasksReducer,
         ListSlice: ListSlice,
         taskSlice: taskSlice,
         questions: questionSlice, 
         attendance: attendanceReduce 

    
  },
})

