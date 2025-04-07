import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { 
    id: 1, 
    title: "עידכון: מחר יתקיים המפגש הראשון",
    start: new Date(2025, 3, 3, 17, 30), 
    end: new Date(2025, 3, 3, 17, 30),
    updateMessage:"חשוב לדייק בזמנים"
  },
  { 
    id: 2, 
    title: "עידכון לגבי מפגש הזום שיתקיים מחר",
    start: new Date(2025, 3, 6, 17, 30), 
    end: new Date(2025, 3, 6, 17, 30),
    updateMessage:" חובה לפתוח מצלמה"

  },
  { 
    id: 3, 
    title: "שימו לב,מחר יחולקו גליוני נוכחות",
    start: new Date(2025, 3, 30, 17, 30), 
    end: new Date(2025, 3, 30, 17, 30),
    updateMessage:""
  }
   
   
];

const UpdateSlice = createSlice({
  name: "updates",
  initialState,
  reducers: {
    addUpdate: (state, action) => {
      const existingUpdatetIndex = state.findIndex(update => update.id === action.payload.id);
      if (existingUpdatetIndex !== -1) {
        state[existingUpdatetIndex] = action.payload; 
      } else {
        state.push({ ...action.payload, id: Date.now() });
      }
    },
    deleteUpdate: (state, action) => {
      return state.filter((update) => update.id !== action.payload.id);
    },
   
  },
});

export const { addUpdate ,deleteUpdate} = UpdateSlice.actions;
export default UpdateSlice.reducer;