import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [
      { id: 1,  from: 'hadasa&tzippy', fromId: '1111', createDate: new Date(),  deleted: false, text: 'Hello' },
  ]
};
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle', // או 'loading' או 'failed'
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // setStatus: (state, action) => {
    //   state.status = action.payload;
    // },
    deleteMessages: (state) => {
      state.messages = [];
    },
    updateMessage: (state, action) => {
      const { id, text } = action.payload;
      const existingMessage = state.messages.find(
        (message) => message.id === id
      );
      if (existingMessage) {
        existingMessage.text = text;
      }
  },
  },
});
//, setStatus
export const { addMessage, deleteMessages,updateMessage } = chatSlice.actions;

export default chatSlice.reducer;
