// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { useNavigate, useParams } from 'react-router-dom';
// import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import SaveIcon from '@mui/icons-material/Save';
// import { addQuestions } from './taskSlice';

// export const AddQuestions = () => {
//     const { taskId } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [questions, setQuestions] = useState([]);
//     const [newQuestion, setNewQuestion] = useState({ number: '', text: '', commentOrFile: '' });

//     const handleChange = (e) => {
//         setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
//     };

//     const handleAddQuestion = () => {
//         if (newQuestion.number.trim() && (newQuestion.text.trim() || newQuestion.commentOrFile.trim())) {
//             setQuestions([...questions, { ...newQuestion }]);
//             setNewQuestion({ number: '', text: '', commentOrFile: '' });
//         } else {
//             alert('יש למלא לפחות מספר שאלה ואת השאלה עצמה או הערה/קובץ.');
//         }
//     };

//     const handleSaveQuestions = () => {
//         if (questions.length > 0) {
//             dispatch(addQuestions({ taskId, questions }));
//             navigate(navigate(`/TaskList/${taskId}`)); // הנתיב לרשימת המטלות
//         } else {
//             alert('יש להוסיף לפחות שאלה אחת.');
//         }
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '20px' }}>
//             <Typography variant="h6" gutterBottom>הוספת שאלות למטלה</Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                     <TextField
//                         fullWidth
//                         label="מספר שאלה"
//                         name="number"
//                         value={newQuestion.number}
//                         onChange={handleChange}
//                         variant="outlined"
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={8}>
//                     <TextField
//                         fullWidth
//                         label="השאלה"
//                         name="text"
//                         value={newQuestion.text}
//                         onChange={handleChange}
//                         variant="outlined"
//                         multiline
//                         rows={2}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         fullWidth
//                         label="הערה על השאלה / הכנסת קובץ"
//                         name="commentOrFile"
//                         value={newQuestion.commentOrFile}
//                         onChange={handleChange}
//                         variant="outlined"
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<AddIcon />}
//                         onClick={handleAddQuestion}
//                     >
//                         הוסף שאלה
//                     </Button>
//                 </Grid>

//                 {questions.length > 0 && (
//                     <Grid item xs={12} style={{ marginTop: '20px' }}>
//                         <Typography variant="subtitle1" gutterBottom>שאלות שהוספת:</Typography>
//                         <Box component="ul" sx={{ listStyleType: 'disc', pl: 2 }}>
//                             {questions.map((q, index) => (
//                                 <li key={index}>
//                                     {q.number}. {q.text} {q.commentOrFile && `(${q.commentOrFile.length > 20 ? q.commentOrFile.substring(0, 20) + '...' : q.commentOrFile})`}
//                                 </li>
//                             ))}
//                         </Box>
//                     </Grid>
//                 )}

//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSaveQuestions}
//                     >
//                         שמור שאלות ומעבר לרשימת מטלות
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };







// // AddQuestions.jsx
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import SaveIcon from '@mui/icons-material/Save';
// import { addQuestions } from './taskSlice'; // ודאי שהנתיב נכון

// export const AddQuestions = () => {
//     const { taskId, taskName, courseName } = useParams(); // קבלת גם את שם המטלה וגם את שם הקורס
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [questions, setQuestions] = useState([]);
//     const [newQuestion, setNewQuestion] = useState({ number: '', text: '', commentOrFile: '' });

//     const handleChange = (e) => {
//         setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
//     };

//     const handleAddQuestion = () => {
//         if (newQuestion.number.trim() && (newQuestion.text.trim() || newQuestion.commentOrFile.trim())) {
//             setQuestions([...questions, { ...newQuestion }]);
//             setNewQuestion({ number: '', text: '', commentOrFile: '' });
//         } else {
//             alert('יש למלא לפחות מספר שאלה ואת השאלה עצמה או הערה/קובץ.');
//         }
//     };

//     const handleSaveQuestions = () => {
//         if (questions.length > 0) {
//             dispatch(addQuestions({ taskId, questions }));
//             navigate(`/TaskList/${courseName}`); // ניווט חזרה לרשימת המטלות של הקורס
//         } else {
//             alert('יש להוסיף לפחות שאלה אחת.');
//         }
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '20px' }}>
//             <Typography variant="h6" gutterBottom>הוספת שאלות למטלה</Typography>
//             <Grid container spacing={3}>
//                 {/* ... (שדות הקלט של השאלות) ... */}
//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSaveQuestions}
//                     >
//                         שמור שאלות ומעבר לרשימת מטלות
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };




// // AddQuestions.jsx
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import SaveIcon from '@mui/icons-material/Save';
// import { addQuestions } from './taskSlice'; // ודאי שהנתיב נכון

// export const AddQuestions = () => {
//     const { taskId, taskName, courseName } = useParams(); // קבלת גם את שם המטלה וגם את שם הקורס
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [questions, setQuestions] = useState([]);
//     const [newQuestion, setNewQuestion] = useState({ number: '', text: '', commentOrFile: '' });

//     const handleChange = (e) => {
//         setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
//     };

//     const handleAddQuestion = () => {
//         if (newQuestion.number.trim() && (newQuestion.text.trim() || newQuestion.commentOrFile.trim())) {
//             setQuestions([...questions, { ...newQuestion }]);
//             setNewQuestion({ number: '', text: '', commentOrFile: '' });
//         } else {
//             alert('יש למלא לפחות מספר שאלה ואת השאלה עצמה או הערה/קובץ.');
//         }
//     };

//     const handleSaveQuestions = () => {
//         if (questions.length > 0) {
//             dispatch(addQuestions({ taskId, questions }));
//             navigate(`/TaskList/${courseName}`); // ניווט חזרה לרשימת המטלות של הקורס
//         } else {
//             alert('יש להוסיף לפחות שאלה אחת.');
//         }
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '20px' }}>
//             <Typography variant="h6" gutterBottom>הוספת שאלות למטלה</Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={4}>
//                     <TextField
//                         fullWidth
//                         label="מספר שאלה"
//                         name="number"
//                         value={newQuestion.number}
//                         onChange={handleChange}
//                         variant="outlined"
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={8}>
//                     <TextField
//                         fullWidth
//                         label="השאלה"
//                         name="text"
//                         value={newQuestion.text}
//                         onChange={handleChange}
//                         variant="outlined"
//                         multiline
//                         rows={2}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         fullWidth
//                         label="הערה על השאלה / הכנסת קובץ"
//                         name="commentOrFile"
//                         value={newQuestion.commentOrFile}
//                         onChange={handleChange}
//                         variant="outlined"
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<AddIcon />}
//                         onClick={handleAddQuestion}
//                     >
//                         הוסף שאלה
//                     </Button>
//                 </Grid>

//                 {questions.length > 0 && (
//                     <Grid item xs={12} style={{ marginTop: '20px' }}>
//                         <Typography variant="subtitle1" gutterBottom>שאלות שהוספת:</Typography>
//                         <Box component="ul" sx={{ listStyleType: 'disc', pl: 2 }}>
//                             {questions.map((q, index) => (
//                                 <li key={index}>
//                                     {q.number}. {q.text} {q.commentOrFile && `(${q.commentOrFile.length > 20 ? q.commentOrFile.substring(0, 20) + '...' : q.commentOrFile})`}
//                                 </li>
//                             ))}
//                         </Box>
//                     </Grid>
//                 )}

//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSaveQuestions}
//                     >
//                         שמור שאלות ומעבר לרשימת מטלות
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// };










// AddQuestions.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { addQuestions } from './taskSlice'; // ודאי שהנתיב נכון

export const AddQuestions = () => {
    const { taskId, courseName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ number: '', text: '', commentOrFile: '' });

    const handleChange = (e) => {
        setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
    };

    const handleAddAndSaveQuestion = () => {
        if (newQuestion.number.trim() && (newQuestion.text.trim() || newQuestion.commentOrFile.trim())) {
            setQuestions([...questions, { ...newQuestion }]);
            setNewQuestion({ number: '', text: '', commentOrFile: '' });
            alert('השאלה נשמרה בהצלחה.'); // משוב למשתמש
        } else {
            alert('יש למלא לפחות מספר שאלה ואת השאלה עצמה או הערה/קובץ.');
        }
    };

    const handleSaveAllQuestions = () => {
        if (questions.length > 0) {
            dispatch(addQuestions({ taskId, questions }));
            navigate(`/TaskList/${courseName}`);
        } else {
            alert('יש להוסיף לפחות שאלה אחת.');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>הוספת שאלות למטלה</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="מספר שאלה"
                        name="number"
                        value={newQuestion.number}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <TextField
                        fullWidth
                        label="השאלה"
                        name="text"
                        value={newQuestion.text}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={2}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="הערה על השאלה / הכנסת קובץ"
                        name="commentOrFile"
                        value={newQuestion.commentOrFile}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddAndSaveQuestion}
                        style={{ marginRight: '10px' }}
                    >
                        שמור שאלה והוסף עוד
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveAllQuestions}
                    >
                        שמור שאלות ומעבר לרשימת מטלות
                    </Button>
                </Grid>

                {questions.length > 0 && (
                    <Grid item xs={12} style={{ marginTop: '20px' }}>
                        <Typography variant="subtitle1" gutterBottom>שאלות שהוספת:</Typography>
                        <Box component="ul" sx={{ listStyleType: 'disc', pl: 2 }}>
                            {questions.map((q, index) => (
                                <li key={index}>
                                    {q.number}. {q.text} {q.commentOrFile && `(${q.commentOrFile.length > 20 ? q.commentOrFile.substring(0, 20) + '...' : q.commentOrFile})`}
                                </li>
                            ))}
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};