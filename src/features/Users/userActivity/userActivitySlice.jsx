import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activities: [
    {
      id: 1,
      userId: 1,
      type: 'צפייה בקורס',
      url: 'https://ourwebsite.com/courses/1/2',
      date: '2025-04-22T12:00:00Z'
    },
    {
      id: 2,
      userId: 2,
      type: 'שינוי סיסמה',
      url: 'https://ourwebsite.com/settings',
      date: '2025-04-21T09:45:00Z'
    },
    {
      id: 3,
      userId: 3,
      type: 'בדיקת משימות',
      url: 'https://ourwebsite.com/tasks',
      date: '2025-04-20T16:30:00Z'
    },
    {
      id: 4,
      userId: 4,
      type: 'כניסה לאזור אישי',
      url: 'https://ourwebsite.com/profile',
      date: '2025-04-19T11:20:00Z'
    },
    {
      id: 5,
      userId: 5,
      type: 'צפייה בסרטון הדרכה',
      url: 'https://ourwebsite.com/videos/intro',
      date: '2025-04-18T18:15:00Z'
    }
  ],
  lastActivity: null
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
    }
  }
});

export const { setActivities, setLastActivity, addActivity } = userActivitySlice.actions;
export default userActivitySlice.reducer;
