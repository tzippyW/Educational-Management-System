import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registrations: [], // רשימת הנרשמות
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    addRegistration: (state, action) => {
      state.registrations.push({
        id: state.registrations.length + 1,
        ...action.payload,
      });
    },
    markAsRead: (state, action) => {
      const user = state.registrations.find((reg) => reg.id === action.payload);
      if (user) {
        user.status = 'נקרא';
      }
    },
    deleteRegistration: (state, action) => {
      state.registrations = state.registrations.filter((reg) => reg.id !== action.payload);
    },
    filterRegistrations: (state, action) => {
    },
  },
});

export const { addRegistration, markAsRead, deleteRegistration, filterRegistrations } =
  registrationSlice.actions;

export default registrationSlice.reducer;