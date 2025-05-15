import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [
        {
            id: 'c1',
            name: 'HTML',
            teacher: 'מרצה א',
            sessions: [
                '2025-04-01', '2025-04-02', '2025-04-03', '2025-04-04', '2025-04-05',
                '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10'
            ],
            students: [
                {
                    id: 's1',
                    name: 'נועה כהן',
                    attendance: {
                        '2025-04-01': true,
                        '2025-04-02': false,
                        '2025-04-03': true,
                        '2025-04-04': false,
                        '2025-04-05': true,
                        '2025-04-06': true,
                        '2025-04-07': false,
                        '2025-04-08': true,
                        '2025-04-09': true,
                        '2025-04-10': false
                    },
                },
                {
                    id: 's2',
                    name: 'רחל לוי',
                    attendance: {
                        '2025-04-01': true,
                        '2025-04-02': true,
                        '2025-04-03': false,
                        '2025-04-04': true,
                        '2025-04-05': false,
                        '2025-04-06': true,
                        '2025-04-07': true,
                        '2025-04-08': false,
                        '2025-04-09': true,
                        '2025-04-10': true
                    },
                },
                {
                    id: 's3',
                    name: 'תמר שוקרון',
                    attendance: {
                        '2025-04-01': true,
                        '2025-04-02': false,
                        '2025-04-03': true,
                        '2025-04-04': true,
                        '2025-04-05': true,
                        '2025-04-06': false,
                        '2025-04-07': false,
                        '2025-04-08': true,
                        '2025-04-09': false,
                        '2025-04-10': true
                    },
                },
            ],
        },
        {
            id: 'c2',
            name: 'JAVA',
            teacher: 'מרצה ב',
            sessions: [
                '2025-04-01', '2025-04-04', '2025-04-05', '2025-04-06', '2025-04-07',
                '2025-04-08', '2025-04-09', '2025-04-10'
            ],
            students: [
                {
                    id: 's1',
                    name: 'נועה כהן',
                    attendance: {
                        '2025-04-01': true,
                        '2025-04-04': true,
                        '2025-04-05': false,
                        '2025-04-06': true,
                        '2025-04-07': false,
                        '2025-04-08': true,
                        '2025-04-09': true,
                        '2025-04-10': false
                    },
                },
                {
                    id: 's3',
                    name: 'שרה דן',
                    attendance: {
                        '2025-04-01': false,
                        '2025-04-04': true,
                        '2025-04-05': false,
                        '2025-04-06': true,
                        '2025-04-07': true,
                        '2025-04-08': false,
                        '2025-04-09': true,
                        '2025-04-10': true
                    },
                },
                {
                    id: 's4',
                    name: 'אילנית ישראלי',
                    attendance: {
                        '2025-04-01': true,
                        '2025-04-04': false,
                        '2025-04-05': true,
                        '2025-04-06': true,
                        '2025-04-07': false,
                        '2025-04-08': true,
                        '2025-04-09': true,
                        '2025-04-10': false
                    },
                },
            ],
        },
        {
            id: 'c3',
            name: 'UI/UX',
            teacher: 'מרצה ג',
            sessions: [
                '2025-04-02', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09',
                '2025-04-10'
            ],
            students: [
                {
                    id: 's4',
                    name: 'יעל ניסים',
                    attendance: {
                        '2025-04-02': true,
                        '2025-04-06': true,
                        '2025-04-07': false,
                        '2025-04-08': true,
                        '2025-04-09': true,
                        '2025-04-10': false
                    },
                },
                {
                    id: 's5',
                    name: 'אורי בן דוד',
                    attendance: {
                        '2025-04-02': false,
                        '2025-04-06': true,
                        '2025-04-07': true,
                        '2025-04-08': false,
                        '2025-04-09': true,
                        '2025-04-10': true
                    },
                },
                {
                    id: 's6',
                    name: 'ליהי תורגמן',
                    attendance: {
                        '2025-04-02': true,
                        '2025-04-06': false,
                        '2025-04-07': true,
                        '2025-04-08': true,
                        '2025-04-09': true,
                        '2025-04-10': false
                    },
                },
            ],
        },
        {
            id: 'c4',
            name: 'JavaScript',
            teacher: 'מרצה ד',
            sessions: [
                '2025-04-03', '2025-04-07', '2025-04-10', '2025-04-11', '2025-04-12',
                '2025-04-13', '2025-04-14', '2025-04-15'
            ],
            students: [
                {
                    id: 's6',
                    name: 'מיכל כהן',
                    attendance: {
                        '2025-04-03': true,
                        '2025-04-07': false,
                        '2025-04-10': true,
                        '2025-04-11': false,
                        '2025-04-12': true,
                        '2025-04-13': false,
                        '2025-04-14': true,
                        '2025-04-15': true
                    },
                },
                {
                    id: 's7',
                    name: 'תומר אלקיים',
                    attendance: {
                        '2025-04-03': true,
                        '2025-04-07': true,
                        '2025-04-10': true,
                        '2025-04-11': true,
                        '2025-04-12': true,
                        '2025-04-13': true,
                        '2025-04-14': true,
                        '2025-04-15': true
                    },
                },
                {
                    id: 's8',
                    name: 'מיה ריבלין',
                    attendance: {
                        '2025-04-03': false,
                        '2025-04-07': true,
                        '2025-04-10': true,
                        '2025-04-11': true,
                        '2025-04-12': true,
                        '2025-04-13': false,
                        '2025-04-14': true,
                        '2025-04-15': false
                    },
                },
            ],
        },
    ],
};

const viewAllAttendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
    },
});

export const { setCourses } = viewAllAttendanceSlice.actions;

export default viewAllAttendanceSlice.reducer;
