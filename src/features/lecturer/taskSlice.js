import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        {
            id: '1',
            name: 'מטלה 1',
            desc: '7 out of 9 must be answered.',
            lessonId: "שיעור 1",
            finalDate: "29/04/25",
            instructionsFile: "הוראות_מטלה_1.pdf",
            type: "Test",
            course: 'מבוא למדעי המחשב',
            isSubmitted: false
        },
        {
            id: '2',
            name: 'מטלה 2',
            desc: '1 out of 5 must be answered.',
            lessonId: "שיעור 2",
            finalDate: "11/02/24",
            instructionsFile: "הוראות_מטלה_2.docx",
            type: "Homework",
            course: 'אלגוריתמים',
            isSubmitted: false
        },
        {
            id: '3',
            name: 'מטלה 3',
            desc: '1 out of 8 must be answered.',
            lessonId: "שיעור 3",
            finalDate: "11/02/24",
            instructionsFile: "הוראות_מטלה_3.pdf",
            type: "Examiner",
            course: 'תכנות מתקדם',
            isSubmitted: false
        },
        {
            id: '4',
            name: 'מטלה 4',
            desc: '5 out of 12 must be answered.',
            lessonId: "שיעור 4",
            finalDate: "30/07/25",
            instructionsFile: "הוראות_מטלה_4.pdf",
            type:"Test",
            course: 'מבוא למדעי המחשב',
            isSubmitted: false
        },
        {
            id: '5',
            name: 'מטלה 5',
            desc: '4 out of 10 must be answered.',
            lessonId: "שיעור 5",
            finalDate: "26/04/25",
            instructionsFile: "הוראות_מטלה_5.docx",
            type: "Test",
            course: 'אלגוריתמים',
            isSubmitted: false
        },
    ],
    status: 'idle',
    error: null
};

const taskSlice = createSlice({
    name: 'taskSlice', // שינוי השם ל-taskSlice
    initialState,
    reducers: {
        addTask: (state, action) => {
            const task = action.payload;
            task.id = Date.now().toString();
            task.isSubmitted = false;
            state.tasks.push(task);
        },
        updatedTask: (state, action) => {
            const updatedTask = action.payload;
            const taskIndex = state.tasks.findIndex(x => x.id === updatedTask.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
            }
        },
        deleteTask: (state, action) => {
            const id = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== id);
        },
        addQuestions: (state, action) => {
            const { taskId, questions } = action.payload;
            const task = state.tasks.find(t => t.id === taskId);
            if (task) {
                task.questions = questions;
            }
        },
        submitTask: (state, action) => {
            const taskId = action.payload;
            const task = state.tasks.find((t) => t.id === taskId);
            if (task) {
                task.isSubmitted = true; // תיקון: שינוי מ-submitted ל-isSubmitted
            }
        }
    }
});

export const { addTask, updatedTask, deleteTask, addQuestions, submitTask } = taskSlice.actions;

// תיקון הסלקטורים
export const getTaskById = (state, taskId) => {
    return state.taskSlice.tasks.find(task => task.id === taskId);
};

export const getTasksByCourse = (state, courseName) => {
    return state.taskSlice.tasks.filter(task => task.course === courseName);
};

// הוספת סלקטור חדש לקבלת כל המטלות
export const getAllTasks = (state) => state.taskSlice.tasks || [];

export default taskSlice.reducer;
