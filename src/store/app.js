

import { configureStore } from '@reduxjs/toolkit'
import eventReducer from "../features/events/EventsSlice";
import updateReducer from "../features/update/UpdatesSlice";

export const store = configureStore({
  reducer: {
         events: eventReducer,
         updates: updateReducer
    
  },
})

