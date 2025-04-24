import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [
    {
      id: 1,
      name: 'אביגיל',
      email: 'abigail@gmail.com',
      password: '1234',
      lastActivityDate: '2025-04-21 14:30',
      status: true,
    },
    {
      id: 2,
      name: 'דני',
      email: 'danny@example.com',
      password: 'abcd',
      lastActivityDate: '2025-04-20 09:15',
      status: true,
    },
    {
      id: 3,
      name: 'רותם',
      email: 'rot@example.com',
      password: 'pass123',
      lastActivityDate: '2025-04-18 19:50',
      status: false,
    },
    {
      id: 4,
      name: 'שירה',
      email: 'shira@test.com',
      password: 'qwer',
      lastActivityDate: '2025-04-22 08:10',
      status: true,
    },
    {
      id: 5,
      name: 'אלעד',
      email: 'elad@site.com',
      password: 'zxcv',
      lastActivityDate: '2025-04-17 22:05',
      status: false,
    },
  ],
  reducers: {
    // אם תרצי להוסיף משתמש בעתיד, תוסיפי פונקציה כאן
  },
});

export const selectUsers = (state) => state.users;
export default usersSlice.reducer;
