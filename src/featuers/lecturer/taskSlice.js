import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        { id: 1, name: 'chagit', desc: '7 out of 9 must be answered.', lessonId: 111, finalDate: "11/02/24", instrucƟonsFile: "math", type: "Test", course: 'מבוא למדעי המחשב' },
        { id: 2, name: 'chana', desc: '1 out of 5 must be answered.', lessonId: 222, finalDate: "11/02/24", instrucƟonsFile: "math", type: "Homework", course: 'אלגוריתמים' },
        { id: 3, name: 'chaya', desc: '1 out of 8 must be answered.', lessonId: 333, finalDate: "11/02/24", instrucƟonsFile: "math", type: "Examiner", course: 'תכנות מתקדם' },
        { id: 4, name: 'chani', desc: '5 out of 12 must be answered.', lessonId: 444, finalDate: "11/02/24", instrucƟonsFile: "math", type: "Examiner", course: 'מבוא למדעי המחשב' },
        { id: 5, name: 'sara', desc: '4 out of 10 must be answered.', lessonId: 555, finalDate: "11/02/24", instrucƟonsFile: "math", type: "Test", course: 'אלגוריתמים' },
    ],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const task = action.payload;
            task.id = Date.now().toString();
            state.tasks.push(task);
        },
        updatedTask: (state, action) => {
            const updatedTask = action.payload;
            const taskIndex = state.tasks.findIndex(x => x.id === updatedTask.id);
            state.tasks[taskIndex] = updatedTask;
        },
        deleteTask: (state, action) => {
            const id = action.payload;
            const taskIndex = state.tasks.findIndex(x => x.id === id);
            state.tasks.splice(taskIndex, 1);
        },
        addQuestions: (state, action) => {
            const { taskId, questions } = action.payload;
            const task = state.tasks.find(t => t.name === taskId);
            if (task) {
                task.questions = questions;
            }
    },
    }});



export const { addTask, updatedTask, deleteTask ,addQuestions} = taskSlice.actions;

export default taskSlice.reducer;