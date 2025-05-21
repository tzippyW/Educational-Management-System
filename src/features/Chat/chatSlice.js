
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChat: 'REACT',
  messages: {
    REACT: [],
    "C#": [],
    JAVA: [],
    ANGULAR: []
  }
};

const chatSlice = createSlice({
  name: 'Chatt',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { chatName, message } = action.payload;
      if (!state.messages[chatName]) {
        state.messages[chatName] = [];
      }
      state.messages[chatName].push(message);
    },
  
    updateMessage: (state, action) => {
      const { chatName, index, newMessage } = action.payload;
    
      if (state.messages[chatName] && state.messages[chatName][index]) {
        state.messages[chatName][index] = newMessage;
      }
    },

    deleteMessage: (state, action) => {
      const { chatName, index } = action.payload;
    
      if (state.messages[chatName]) {
        state.messages[chatName].splice(index, 1);
      }
    },

    clearMessages: (state, action) => {
      const chatName = action.payload;
    
      // אם לא הועבר chatName, ננקה את כל הצ'אטים
      if (!chatName) {
        Object.keys(state.messages).forEach((key) => {
          state.messages[key] = [];
        });
      } else {
        state.messages[chatName] = [];
      }
    },
    
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { addMessage, updateMessage, deleteMessage, clearMessages, setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
