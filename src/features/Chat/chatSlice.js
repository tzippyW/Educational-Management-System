// // import { createSlice } from '@reduxjs/toolkit';

// // const chatSlice = createSlice({
// //   name: 'Chatt',
// //   initialState: {
// //     messages: [],
// //   },
// //   reducers: {
// //     addMessage: (state, action) => {
// //       state.messages.push(action.payload);
// //     },
// //     deleteMessages: (state) => {
// //       state.messages = [];
// //     },
// //     updateMessage: (state, action) => {
// //       const { index, newMessage } = action.payload;
// //       state.messages[index] = newMessage;
// //     }
// //   },
// // });

// // export const { addMessage, deleteMessages, updateMessage } = chatSlice.actions;
// // export default chatSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const chatSlice = createSlice({
//   name: 'Chatt',
//   initialState: {
//     messages: [],
//   },
//   reducers: {
//     addMessage: (state, action) => {
//       state.messages.push(action.payload);
//     },
//     deleteMessage: (state, action) => {
//       const index = action.payload;
//       state.messages.splice(index, 1);
//     },
//     updateMessage: (state, action) => {
//       const { index, newMessage } = action.payload;
//       state.messages[index] = newMessage;
//     }
//   },
// });

// export const { addMessage, deleteMessage, updateMessage } = chatSlice.actions;
// export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'Chatt',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action) => {
      const { index, newMessage } = action.payload;
      state.messages[index] = newMessage;
    },
    deleteMessage: (state, action) => {
      state.messages.splice(action.payload, 1);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, updateMessage, deleteMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
