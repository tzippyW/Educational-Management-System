import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Button,
    TextField,
    Container,
    Avatar,
    Zoom,
    Paper,
    Snackbar,
    Alert,
    CircularProgress,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Numbers as NumbersIcon,
    TextFields as TextFieldsIcon,
    Comment as CommentIcon,
    Save as SaveIcon,
    CheckCircle as CheckCircleIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { updateQuestion, getQuestionsByTaskId } from '../lecturer/questionSlice';
import { submitTask } from '../lecturer/taskSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: '"Rubik", "Assistant", "Heebo", sans-serif',
    },
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#f50057' },
        success: { main: '#4caf50' },
        background: { default: '#f5f5f5' },
    },
});

const StudentQuestions = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const task = useSelector((state) =>
        state.taskSlice?.tasks?.find((t) => t.id === taskId)
    );

    const questions = useSelector((state) => getQuestionsByTaskId(state, taskId));
    const [answers, setAnswers] = useState({});
    const [completedQuestions, setCompletedQuestions] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successDialog, setSuccessDialog] = useState(false);
    const [fileAnswers, setFileAnswers] = useState({});

    const handleFileUpload = (questionId, event) => {
        const file = event.target.files[0];
        if (file) {
            setFileAnswers({
                ...fileAnswers,
                [questionId]: file
            });
            setSnackbar({ open: true, message: `הקובץ ${file.name} הועלה בהצלחה`, severity: 'success' });
        }
    };

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error('Error loading questions:', err);
                setError('אירעה שגיאה בטעינת השאלות. אנא נסה שוב.');
                setLoading(false);
            }
        };

        loadQuestions();
    }, [taskId, dispatch]);

    useEffect(() => {
        if (questions && questions.length > 0) {
            const answeredCount = questions.filter(
                (q) => (answers[q.id] && answers[q.id].trim() !== '') || (q.studentAnswer && q.studentAnswer.trim() !== '')
            ).length;

            setCompletedQuestions(answeredCount);

            const initialAnswers = {};
            questions.forEach((q) => {
                if (q.studentAnswer) {
                    initialAnswers[q.id] = q.studentAnswer;
                }
            });

            if (Object.keys(initialAnswers).length > 0 && Object.keys(answers).length === 0) {
                setAnswers(initialAnswers);
            }
        }
    }, [questions, answers]);

    const handleAnswerChange = (id, value) => {
        setAnswers({ ...answers, [id]: value });
    };

    const handleSaveAnswer = (question) => {
        if (!answers[question.id] || answers[question.id].trim() === '') {
            setSnackbar({ open: true, message: 'לא ניתן לשמור תשובה ריקה', severity: 'warning' });
            return;
        }

        dispatch(updateQuestion({ ...question, studentAnswer: answers[question.id] }));
        setSnackbar({ open: true, message: 'התשובה נשמרה', severity: 'success' });
    };

    const handleCompleteQuestions = () => {
        let allSaved = true;

        questions.forEach((question) => {
            if (answers[question.id] && answers[question.id].trim() !== '') {
                if (answers[question.id] !== question.studentAnswer) {
                    dispatch(updateQuestion({ ...question, studentAnswer: answers[question.id] }));
                }
            } else if (!question.studentAnswer || question.studentAnswer.trim() === '') {
                allSaved = false;
            }
        });

        if (allSaved) {
            dispatch(submitTask(taskId));
            setSuccessDialog(true);
        } else {
            setSnackbar({
                open: true,
                message: 'השאלות נשמרו להמשך מאוחר יותר',
                severity: 'info',
            });
        }
    };

    /**
     * Handles closing the success dialog after task completion
     * 
     * @function handleCloseSuccessDialog
     * @description
     * - Sets the success dialog state to false
     * - Navigates the user back to the StudentTasks page
     * - Currently has a commented out window reload (potential performance/UX issue)
     * 
     * @potential-improvements
     * - Consider removing commented reload to prevent unnecessary page refresh
     * - Ensure state management handles navigation smoothly without manual reload
     */
    const handleCloseSuccessDialog = () => {

        setSuccessDialog(false);
        navigate(-1)
    
    };

    const handleGoBack = () => {
        questions.forEach((question) => {
            if (answers[question.id] && answers[question.id] !== question.studentAnswer) {
                dispatch(updateQuestion({ ...question, studentAnswer: answers[question.id] }));
            }
        });

        navigate(-1);
        
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg" dir="rtl" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Box textAlign="center">
                        <CircularProgress />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            טוען שאלות...
                        </Typography>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }

    if (error) {
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg" dir="rtl" sx={{ mt: 4, mb: 4 }}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                    <Button variant="contained" onClick={() => handleGoBack()}>
                        חזור לרשימת המטלות
                    </Button>
                </Container>
            </ThemeProvider>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg" dir="rtl" sx={{ mt: 4, mb: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4, background: 'linear-gradient(to right, #f5f7fa, #e4e7eb)' }}>
                        <Typography variant="h5" component="h1" fontWeight="bold">
                            אין שאלות למטלה זו
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                            לא נמצאו שאלות עבור מטלה זו. אנא פנה למרצה.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/tasks/StudentTasks')}>
                            חזור לרשימת המטלות
                        </Button>
                    </Paper>
                </Container>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" dir="rtl" sx={{ mt: 4, mb: 4, position: 'relative' }}>
                <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
                    <Tooltip title="חזור לרשימת המטלות" placement="right">
                        <IconButton color="primary" onClick={handleGoBack} sx={{ bgcolor: 'white', boxShadow: 2, '&:hover': { bgcolor: '#f5f5f5' } }}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Dialog open={successDialog} onClose={handleCloseSuccessDialog} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        הגשה הושלמה בהצלחה
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                            <Typography variant="h6" align="center">
                                התשובות הוגשו בהצלחה!
                            </Typography>
                            <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 1 }}>
                                המטלה סומנה כהושלמה במערכת.
                            </Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                        <Button variant="contained" color="primary" onClick={handleCloseSuccessDialog}>
                            חזור לרשימת המטלות
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4, background: 'linear-gradient(to right, #f5f7fa, #e4e7eb)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            שאלות למטלה: {task ? task.name : taskId}
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        ענה על השאלות בהתאם להוראות המרצה.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {completedQuestions} / {questions.length} שאלות נענו
                    </Typography>
                </Paper>

                <Grid container spacing={3}>
                    {questions.map((question, index) => (
                        <Grid item xs={12} md={6} key={question.id}>
                            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 1.5, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 1 }}>
                                                <NumbersIcon />
                                            </Avatar>
                                            <Typography variant="h6" fontWeight="bold">
                                                שאלה מספר {question.number || index + 1}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography variant="body1" paragraph sx={{ fontWeight: 500, fontSize: '1.1rem', mb: 3 }}>
                                            {question.text}
                                        </Typography>
                                        {question.commentOrFile && (
                                            <>
                                                <Divider sx={{ my: 2 }} />
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                                    <CommentIcon color="action" sx={{ mr: 1 }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {question.commentOrFile}
                                                    </Typography>
                                                </Box>
                                            </>
                                        )}
                                        <TextField
                                            fullWidth
                                            label="תשובה"
                                            value={answers[question.id] || ''}
                                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                            multiline
                                            rows={2}
                                            sx={{ mt: 2 }}
                                        />
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
                                                                                        onChange={(e) => handleFileUpload(question.id, e)}
                                                                                    />
                                                                                </Button>
                                        <Button variant="contained" color="primary" onClick={() => handleSaveAnswer(question)} startIcon={<SaveIcon />} sx={{ mt: 2 }}>
                                            שמור תשובה
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Zoom>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button variant="contained" color="success" onClick={handleCompleteQuestions} startIcon={completedQuestions === questions.length ? <CheckCircleIcon /> : <SaveIcon />} sx={{ px: 3, py: 1 }}>
                        {completedQuestions === questions.length ? 'הגש שאלות' : 'שמור תשובות'}
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default StudentQuestions;