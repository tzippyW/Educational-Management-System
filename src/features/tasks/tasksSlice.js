
import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filter: 'all',
  },
  reducers: {
    addTask: (state, action) => {
      const { text, dueDate, isImportant } = action.payload;
      state.tasks.push({
        id: Date.now(),
        text,
        dueDate: dueDate || null,
        isImportant: isImportant || false,
        isCompleted: false,
      });
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) Object.assign(task, updatedTask);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.isImportant = !task.isImportant;
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.isCompleted = !task.isCompleted;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleImportant,
  toggleCompleted,
  setFilter,
} = tasksSlice.actions;
export default tasksSlice.reducer;
