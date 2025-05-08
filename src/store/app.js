

import { configureStore } from '@reduxjs/toolkit'
import eventReducer from "../features/events/EventsSlice";
import updateReducer from "../features/update/UpdatesSlice";
import usersReducer from '../features/Users/usersSlice';
import userActivityReducer from '../features/Users/userActivity/userActivitySlice';

export const store = configureStore({
  reducer: {
         events: eventReducer,
         updates: updateReducer,
         users: usersReducer,
         userActivity: userActivityReducer
    
  },
})

