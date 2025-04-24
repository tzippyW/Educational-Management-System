import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'Chatt',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessages: (state) => {
      state.messages = [];
    },
    updateMessage: (state, action) => {
      const { index, newMessage } = action.payload;
      state.messages[index] = newMessage;
    }
  },
});

export const { addMessage, deleteMessages, updateMessage } = chatSlice.actions;
export default chatSlice.reducer;
