import { createSlice } from '@reduxjs/toolkit';
// יצירת הסלייס של tasks
const tasksSlice = createSlice({
  name: 'tasks',  // שם הסלייס
  initialState: [],  // הערך ההתחלתי של ה-state - רשימה ריקה של משימות
  reducers: {
    // פעולה להוספת משימה
    addTask: (state, action) => {
        const newTask = {
          id: Date.now(),  // מזהה ייחודי לפי זמן
          text: action.payload.text,  // טקסט מהקלט
          isImportant: action.payload.isImportant || false, //  שדה חשוב
        };
        state.push(newTask);  // מוסיפים ל־state
      },
    // פעולה לעדכון משימה
    updateTask: (state, action) => {
        const { id, updatedTask } = action.payload;  // מציאת id , והמשימה המעודכנת
        const task = state.find(task => task.id === id);  // חיפוש משימה לפי ה-id
        if (task) {
          task.text = updatedTask.text;  // עדכון הטקסט של המשימה
          task.isImportant = updatedTask.isImportant;  // עדכון אם המשימה חשובה או לא
        }
      },
    // פעולה למחיקת משימה
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload.id);  // סינון המשימה שנמחקה
    },
    // סינון משימות חשובות
filterImportantTasks: (state) => {
    return state.filter(task => task.isImportant);
  }
  }
});

// מייצאים את הפעולות (actions) שנוכל להשתמש בהן ברחבי האפליקציה
export const { addTask, updateTask, deleteTask, filterImportantTasks } = tasksSlice.actions;

// מייצאים את ה-reducer של ה-slice
export default tasksSlice.reducer;
