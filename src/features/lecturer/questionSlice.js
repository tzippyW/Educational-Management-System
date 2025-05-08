import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [
        // מטלה: 1 - מבוא למדעי המחשב
        { id: 1, number: '1', text: 'מהו אלגוריתם?', commentOrFile: 'הסבר בקצרה', taskId: '1' },
        { id: 2, number: '2', text: 'הסבר מהי סיבוכיות זמן ריצה', commentOrFile: 'תן דוגמאות', taskId: '1' },
        { id: 3, number: '3', text: 'מהם היתרונות של תכנות מונחה עצמים?', commentOrFile: 'הסבר בהרחבה', taskId: '1' },
        { id: 4, number: '4', text: 'הסבר את ההבדל בין מערך לרשימה מקושרת', commentOrFile: 'התייחס ליתרונות וחסרונות', taskId: '1' },
        
        // מטלה: 2 - אלגוריתמים
        { id: 5, number: '1', text: 'כתוב פונקציה למציאת מספר פיבונאצ׳י', commentOrFile: 'השתמש בשפת Python', taskId: '2' },
        { id: 6, number: '2', text: 'הסבר את אלגוריתם מיון בועות', commentOrFile: 'כולל סיבוכיות', taskId: '2' },
        { id: 7, number: '3', text: 'מהי רקורסיה? תן דוגמה לבעיה שניתן לפתור באמצעות רקורסיה', commentOrFile: 'הסבר את היתרונות והחסרונות', taskId: '2' },
        
        // מטלה: 3 - תכנות מתקדם
        { id: 8, number: '1', text: 'מהם עקרונות התכנות הפונקציונלי?', commentOrFile: 'הסבר והדגם', taskId: '3' },
        { id: 9, number: '2', text: 'כיצד מטפלים בשגיאות בשפת JavaScript?', commentOrFile: 'תן דוגמאות קוד', taskId: '3' },
        { id: 10, number: '3', text: 'הסבר את מושג ה-closure בשפת JavaScript', commentOrFile: 'כתוב דוגמת קוד', taskId: '3' },
        
        // מטלה: 4 - מבוא למדעי המחשב
        { id: 11, number: '1', text: 'מהי ארכיטקטורת MVC?', commentOrFile: 'הסבר את היתרונות', taskId: '4' },
        { id: 12, number: '2', text: 'כיצד עובד מנגנון ה-Virtual DOM ב-React?', commentOrFile: 'הסבר בפירוט', taskId: '4' },
        { id: 13, number: '3', text: 'מהם Hooks ב-React וכיצד הם משפרים את פיתוח האפליקציה?', commentOrFile: 'תן דוגמאות', taskId: '4' },
        
        // מטלה: 5 - אלגוריתמים
        { id: 14, number: '1', text: 'הסבר את מושג ה-Big O Notation', commentOrFile: 'תן דוגמאות לסיבוכיות שונות', taskId: '5' },
        { id: 15, number: '2', text: 'מהם עצי חיפוש בינאריים וכיצד הם עובדים?', commentOrFile: 'הסבר את פעולות החיפוש וההוספה', taskId: '5' },
        { id: 16, number: '3', text: 'הסבר את אלגוריתם Dijkstra למציאת המסלול הקצר ביותר', commentOrFile: 'תן דוגמה', taskId: '5' },
    ],
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action) => {
            const question = action.payload;
            question.id = Date.now().toString();
            state.questions.push(question);
        },
        updateQuestion: (state, action) => {
            const updatedQuestion = action.payload;
            const questionIndex = state.questions.findIndex(x => x.id === updatedQuestion.id);
            if (questionIndex !== -1) {
                state.questions[questionIndex] = updatedQuestion;
            }
        },
        deleteQuestion: (state, action) => {
            const id = action.payload.id;
            // שימוש ב-filter במקום splice
            state.questions = state.questions.filter(question => question.id !== id);
        },
        addQuestionsToTask: (state, action) => {
            const { taskId, questions } = action.payload;
            const questionsWithIds = questions.map(q => ({
                ...q,
                id: q.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
                taskId
            }));
            state.questions = state.questions.filter(q => q.taskId !== taskId);
            state.questions = [...state.questions, ...questionsWithIds];
        },
        // פעולה חדשה: יצירת שאלות למטלה חדשה
        createQuestionsForTask: (state, action) => {
            const { taskId, questionsData } = action.payload;
            
            // מחק שאלות קיימות למטלה זו (אם יש)
            state.questions = state.questions.filter(q => q.taskId !== taskId);
            
            // הוסף את השאלות החדשות
            const newQuestions = questionsData.map((q, index) => ({
                id: Date.now().toString() + index,
                number: (index + 1).toString(),
                text: q.text,
                commentOrFile: q.commentOrFile || '',
                taskId: taskId
            }));
            
            state.questions = [...state.questions, ...newQuestions];
        },
        // פעולה חדשה: מחיקת כל השאלות של מטלה מסוימת
        deleteTaskQuestions: (state, action) => {
            const taskId = action.payload;
            state.questions = state.questions.filter(q => q.taskId !== taskId);
        }
    }
});

export const {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addQuestionsToTask,
    createQuestionsForTask,
    deleteTaskQuestions
} = questionSlice.actions;

// פונקציה לקבלת כל השאלות של מטלה מסוימת
export const getQuestionsByTaskId = (state, taskId) => {
    return state.questions.questions.filter(q => q.taskId === taskId);
};

// פונקציה חדשה: בדיקה האם יש שאלות למטלה מסוימת
export const hasQuestionsForTask = (state, taskId) => {
    return state.questions.questions.some(q => q.taskId === taskId);
};

// פונקציה חדשה: ספירת מספר השאלות למטלה מסוימת
export const countQuestionsByTaskId = (state, taskId) => {
    return state.questions.questions.filter(q => q.taskId === taskId).length;
};

export default questionSlice.reducer;
