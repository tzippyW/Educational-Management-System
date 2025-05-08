import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updatedTask } from './taskSlice';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    ThemeProvider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
        success: {
            main: '#4caf50'
        },
        blue: {
            main: '#0000FF'
        }
    },
});

export const AddTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { taskId, courseName } = useParams();
    const tasks = useSelector((state) => state.taskSlice?.tasks || []);

    const emptyTask = {
        id: '',
        name: '',
        desc: '',
        lessonId: '',
        finalDate: '',
        instructionsFile: '',
        type: '',
        course: courseName || '',
        isSubmitted: false
    };

    const isEditMode = !!taskId;

    const existingTask = isEditMode
        ? tasks.find(task => task.id.toString() === taskId) || emptyTask
        : emptyTask;

    const [task, setTask] = useState(existingTask);
    const [openDialog, setOpenDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [savedTaskId, setSavedTaskId] = useState(null);

    useEffect(() => {
        if (isEditMode && existingTask) {
            setTask(existingTask);
        } else if (courseName) {
            setTask(prev => ({ ...prev, course: courseName }));
        }
    }, [isEditMode, existingTask, courseName]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setTask({ ...task, instructionsFile: e.target.files[0].name });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.name.trim() && task.course.trim()) {
            if (isEditMode) {
                dispatch(updatedTask(task));
                setSuccessMessage('המטלה עודכנה בהצלחה!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate(`/tasks/TaskList/${task.course}`);
                }, 1500);
            } else {
                const newTask = {
                    ...task,
                    id: Date.now().toString()
                };
                dispatch(addTask(newTask));
                setSavedTaskId(newTask.id);
                setOpenDialog(true);
                setSuccessMessage('המטלה נוספה בהצלחה!');
            }
        } else {
            alert('יש למלא את שם המטלה ושם הקורס.');
        }
    };

    const taskTypes = [
        { value: 'quiz', label: 'בוחן' },
        { value: 'assignment', label: 'מטלה' },
        { value: 'project', label: 'פרויקט' },
        { value: 'exam', label: 'מבחן' }
    ];

    const handleBack = () => {
        navigate(-1);
    };

    const handleNavigateToQuestions = () => {
        if (savedTaskId) {
            navigate(`/tasks/task/${savedTaskId}/questions-list`);
        } else {
            console.error('taskId is null, cannot navigate to questions');
            // כאן אפשר להוסיף הודעת שגיאה למשתמש אם רוצים
        }
    };

    const handleSaveTaskOnly = () => {
        if (task.name.trim() && task.course.trim()) {
            if (isEditMode) {
                dispatch(updatedTask(task));
            } else {
                const newTask = {
                    ...task,
                    id: Date.now().toString()
                };
                dispatch(addTask(newTask));
                setSavedTaskId(newTask.id);
            }
            setSuccessMessage('המטלה נשמרה בהצלחה!');
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate(`/tasks/TaskList/${task.course}`);
            }, 1500);
        } else {
            alert('יש למלא את שם המטלה ושם הקורס.');
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate(`/tasks/TaskList/${task.course}`);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" dir="rtl" sx={{ mt: 4, mb: 4 }}>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        width: '100%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        position: 'relative'
                    }}>
                        <Button
                            sx={{
                                position: 'absolute',
                                left: 16,
                                color: 'white',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                            onClick={handleBack}
                            startIcon={<ArrowBackIcon />}
                        >
                            חזרה
                        </Button>

                        <AssignmentIcon fontSize="large" />
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            {isEditMode ? 'עריכת מטלה' : 'הוספת מטלה חדשה'}
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, width: '100%' }}>
                        <TextField
                            label="שם המטלה"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="תיאור המטלה"
                            name="desc"
                            value={task.desc}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="type-select-label">סוג המטלה</InputLabel>
                            <Select
                                labelId="type-select-label"
                                id="type-select"
                                name="type"
                                value={task.type}
                                label="סוג המטלה"
                                onChange={handleChange}
                            >
                                {taskTypes.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="lesson-select-label">מספר שיעור</InputLabel>
                            <Select
                                labelId="lesson-select-label"
                                id="lesson-select"
                                name="lessonId"
                                value={task.lessonId}
                                label="מספר שיעור"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="תאריך הגשה סופי"
                            type="date"
                            name="finalDate"
                            value={task.finalDate}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="שם הקובץ הנחיות"
                            name="instructionsFile"
                            value={task.instructionsFile}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                    >
                                        העלה קובץ
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                ),
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mx: 2 }}>
                            <Button
                                variant="outlined"
                                color="blue"
                                onClick={() => {
                                    setTask(emptyTask);
                                }}
                                sx={{ px: 4, ml: 2 }}
                            >
                                ביטול
                            </Button>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleSaveTaskOnly}
                                    startIcon={<SaveIcon />}
                                    sx={{ px: 4 }}
                                >
                                    שמור מטלה בלבד
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                    size="large"
                                    sx={{ px: 4, '& .MuiButton-startIcon': { marginRight: '12px' } }}
                                >
                                    שמור והוסף שאלות
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>הוסף שאלות למטלה?</DialogTitle>
                <DialogContent>
                    <Stack direction="row" spacing={2}>
                        <Button
                            component="label"
                            variant="contained"
                            color="primary"
                            startIcon={<AttachFileIcon />}
                            sx={{ px: 4 }}
                        >
                            הוסף קובץ שאלות
                            <input
                                type="file"
                                hidden
                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        console.log("קובץ שאלות נבחר:", e.target.files[0]);
                                    }
                                }}
                            />
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<QuestionMarkIcon />}
                            onClick={handleNavigateToQuestions}
                            sx={{ px: 4 }}
                        >
                            הוסף שאלות ידני
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>סגור</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};
export default AddTask;