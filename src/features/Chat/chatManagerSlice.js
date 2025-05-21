import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChat: 'כללי',
  allChats: {
    'כללי': [],
  },
};

const chatManagerSlice = createSlice({
  name: 'chatManager',
  initialState,
  reducers: {
    switchChat: (state, action) => {
      const chatName = action.payload;
      if (!state.allChats[chatName]) {
        state.allChats[chatName] = [];
      }
      state.selectedChat = chatName;
    },
    addMessageToCurrentChat: (state, action) => {
      state.allChats[state.selectedChat].push(action.payload);
    },
    updateMessageInCurrentChat: (state, action) => {
      const { index, newMessage } = action.payload;
      state.allChats[state.selectedChat][index] = newMessage;
    },
    deleteMessageFromCurrentChat: (state, action) => {
      state.allChats[state.selectedChat].splice(action.payload, 1);
    },
    clearCurrentChatMessages: (state) => {
      state.allChats[state.selectedChat] = [];
    },
  },
});

export const {
  switchChat,
  addMessageToCurrentChat,
  updateMessageInCurrentChat,
  deleteMessageFromCurrentChat,
  clearCurrentChatMessages
} = chatManagerSlice.actions;

export default chatManagerSlice.reducer;
