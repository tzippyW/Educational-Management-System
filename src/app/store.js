import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../featuers/lecturer/taskSlice'

export const store = configureStore({
  reducer: {
     taskSlice:taskReducer
  },
})