// src/features/userActivity/userActivitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activities: [],
  lastActivity: null,
};

const userActivitySlice = createSlice({
  name: 'userActivity',
  initialState,
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
    setLastActivity: (state, action) => {
      state.lastActivity = action.payload;
    },
    addActivity: (state, action) => {
      state.activities.unshift(action.payload);
      state.lastActivity = action.payload;
    },
  },
});

export const { setActivities, setLastActivity, addActivity } = userActivitySlice.actions;
export default userActivitySlice.reducer;
