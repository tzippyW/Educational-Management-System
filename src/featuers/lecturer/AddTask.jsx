// // AddTask.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addTask } from './taskSlice';
// import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

// //הוספת מטלה
// export const AddTask = () => {
//     //להזריק לפה את הפונקצות של הסטור-סלייס
//     const dispatch = useDispatch();
//     const [newTask, setNewTask] = useState({
//         name: '',
//         desc: '',
//         lessonId: '',
//         finalDate: '',
//         instructionsFile: '',
//         type: ''
//     });
//     const [showForm, setShowForm] = useState(false);

//     const handleChange = (e) => {
//         setNewTask({ ...newTask, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(addTask(newTask));
//         setNewTask({
//             name: '',
//             desc: '',
//             lessonId: '',
//             finalDate: '',
//             instructionsFile: '',
//             type: ''
//         });
//         setShowForm(false);
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
//             <Typography variant="h6" gutterBottom>הוספת מטלה</Typography>
//             <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>הוסף מטלה</Button>
//             {showForm && (
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="שם" name="name" value={newTask.name} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="תיאור" name="desc" value={newTask.desc} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="מספר שיעור" name="lessonId" value={newTask.lessonId} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="תאריך סופי" name="finalDate" value={newTask.finalDate} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="קובץ הוראות" name="instructionsFile" value={newTask.instructionsFile} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="סוג" name="type" value={newTask.type} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button variant="contained" color="primary" type="submit">שמור מטלה</Button>
//                         </Grid>
                        
//                     </Grid>
//                 </form>
//             )}
//         </Paper>
//     );
// };







// // AddTask.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
// import { addTask } from './taskSlice';

// export const AddTask = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [newTask, setNewTask] = useState({
//         name: '',
//         desc: '',
//         lessonId: '',
//         finalDate: '',
//         instructionsFile: '',
//         type: ''
//     });
//     const [showForm, setShowForm] = useState(false);

//     const handleChange = (e) => {
//         setNewTask({ ...newTask, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(addTask(newTask));
//         navigate(`/add-questions/${newTask.name}`);
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
//             <Typography variant="h6" gutterBottom>הוספת מטלה</Typography>
//             <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>הוסף מטלה</Button>
//             {showForm && (
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="שם" name="name" value={newTask.name} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="תיאור" name="desc" value={newTask.desc} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="מספר שיעור" name="lessonId" value={newTask.lessonId} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="תאריך סופי" name="finalDate" value={newTask.finalDate} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button variant="contained" color="primary" type="submit">שמור והוסף שאלות</Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             )}
//         </Paper>
//     );
// };





// // AddTask.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
// import { addTask } from './taskSlice';

// export const AddTask = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [newTask, setNewTask] = useState({
//         name: '',
//         desc: '',
//         lessonId: '',
//         finalDate: '',
//         instructionsFile: '',
//         type: ''
//     });
//     const [showForm, setShowForm] = useState(false);

//     const handleChange = (e) => {
//         setNewTask({ ...newTask, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(addTask(newTask));
//         navigate(`/add-questions/${newTask.name}`);
//     };

//     return (
//         <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
//             <Typography variant="h6" gutterBottom>הוספת מטלה</Typography>
//             <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>הוסף מטלה</Button>
//             {showForm && (
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="שם" name="name" value={newTask.name} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="תיאור" name="desc" value={newTask.desc} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="מספר שיעור" name="lessonId" value={newTask.lessonId} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="תאריך סופי" name="finalDate" value={newTask.finalDate} onChange={handleChange} />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button variant="contained" color="primary" type="submit">שמור והוסף שאלות</Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//             )}
//         </Paper>
//     );
// };






// AddTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { addTask } from './taskSlice';
import SaveIcon from '@mui/icons-material/Save';

export const AddTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState({
        name: '',
        desc: '',
        lessonId: '',
        finalDate: '',
        instructionsFile: '',
        type: '',
        course: '' // הוספת שדה 'course'
    });
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };


        const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.name.trim() && newTask.course.trim()) { // הוספת בדיקה לשם הקורס
            dispatch(addTask(newTask));
            navigate(`/add-questions/${newTask.name}/course/${newTask.course}`);
            setNewTask({
                name: '',
                desc: '',
                lessonId: '',
                finalDate: '',
                instructionsFile: '',
                type: '',
                course: ''
            });
            setShowForm(false);
        } else {
            alert('יש למלא את שם המטלה ושם הקורס.');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>הוספת מטלה</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
            >
                הוסף מטלה
            </Button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="שם" name="name" value={newTask.name} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="תיאור" name="desc" value={newTask.desc} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="מספר שיעור" name="lessonId" value={newTask.lessonId} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="תאריך סופי" name="finalDate" value={newTask.finalDate} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="קובץ הוראות" name="instructionsFile" value={newTask.instructionsFile} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="סוג" name="type" value={newTask.type} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="קורס" name="course" value={newTask.course} onChange={handleChange} variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<SaveIcon />}
                                type="submit"
                            >
                                שמור והוסף שאלות
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Paper>
    );
};