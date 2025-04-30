import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 1,
      name: 'אביגיל',
      email: 'avigail8214@gmail.com',
      password: '1234',
      lastActivityDate: '2025-04-21 14:30',
      status: false,
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
  currentUser: null, // המשתמש המחובר
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserPassword: (state, action) => {
      const { email, newPassword } = action.payload;
      const user = state.users.find(user => user.email === email);
      if (user) {
        user.password = newPassword;
      }
    },
    updateUserInList: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

// אקשנים
export const { setCurrentUser, updateUserPassword, updateUserInList } = usersSlice.actions;

// סלקטורים
export const selectUsers = (state) => state.users.users;
export const selectCurrentUser = (state) => state.users.currentUser;

// הרידוסר
export default usersSlice.reducer;
