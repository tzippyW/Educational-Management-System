import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [
    { name: 'אביגיל', email: 'abigail@gmail.com', password: '1234' },
    { name: 'דני', email: 'danny@example.com', password: 'abcd' },
  ],
  reducers: {
    // אם תרצי להוסיף משתמש בעתיד, תוסיפי פונקציה כאן
  },
});

export const selectUsers = (state) => state.users;
export default usersSlice.reducer;
