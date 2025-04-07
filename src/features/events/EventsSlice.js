import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { 
    id: 1, 
    title: "מפגש השתלמות מס' 1",
    type:"מפגשים", 
    start: new Date(2025, 3, 4, 17, 30), 
    end: new Date(2025, 3, 4, 17, 30),
    importance: "3", 
    eventMessage: " סמינר מעלות בשעה:12:00",
    visible:true
  },
  { 
    id: 2, 
    title: "הגשת פרויקט", 
    type:"הגשות",
    start: new Date(2025, 3, 18, 10, 0), 
    end: new Date(2025, 3, 18, 10, 0),
    importance: "2", 
    eventMessage: "הגשת הקוד+תיעוד בסרטון",
    visible:true

  },
  { 
    id: 3, 
    title: " מפגש בזום", 
    type:"זום",
    start: new Date(2025, 3, 7, 10, 0), 
    end: new Date(2025, 3, 7, 12, 0),
    importance: "2", 
    eventMessage: "הנחיות לגבי הגשת הפרויקט",
    visible:true

  },
  { 
    id: 4, 
    title: " מפגש השתלמות מס' 2", 
    type:"מפגשים",
    start: new Date(2025, 3, 15, 10, 0), 
    end: new Date(2025, 3, 15, 12, 0),
    importance: "2", 
    eventMessage: " סמינר מעלות בשעה:16:30",
    visible:true

  },
];

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const existingEventIndex = state.findIndex(event => event.id === action.payload.id);
      if (existingEventIndex !== -1) {
        state[existingEventIndex] = action.payload; 
      } else {
        state.push({ ...action.payload, id: Date.now(), visible: true });
      }
    },
    deleteEvent: (state, action) => {
      return state.filter((event) => event.id !== action.payload.id);
    },
   
  },
});

export const { addEvent ,deleteEvent,updateEvent} = eventSlice.actions;
export default eventSlice.reducer;