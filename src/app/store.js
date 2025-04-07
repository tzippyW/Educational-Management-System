
import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../features/Chat/chatSlice';
import taskReducer from '../featuers/lecturer/taskSlice'
import tasksReducer from '../features/tasks/tasksSlice';
import eventReducer from "../features/events/EventsSlice";
 import  updateReducer  from "../features/update/UpdatesSlice";
export const store = configureStore({
  reducer: {
     tasks: tasksReducer,
     taskSlice:taskReducer,
     chat: chatReducer,
     events: eventReducer

  },
})

