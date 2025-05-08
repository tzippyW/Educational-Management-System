import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Button,
    Container,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    InputAdornment,
    Avatar,
    Snackbar,
    Alert,
    Fade,
    Zoom,
    Divider,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Tooltip,
    IconButton,
    Chip
} from '@mui/material';
import {
    QuestionAnswer as QuestionIcon,
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    Close as CloseIcon,
    Numbers as NumbersIcon,
    TextFields as TextFieldsIcon,
    Comment as CommentIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Check as CheckIcon,
    Assignment as AssignmentIcon,
    FormatQuote as FormatQuoteIcon
} from '@mui/icons-material';
import { updateQuestion, deleteQuestion } from './questionSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// יצירת ערכת נושא מותאמת עם תמיכה בעברית
const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: '"Rubik", "Assistant", "Heebo", sans-serif',
    },
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
        success: {
            main: '#4caf50',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    overflow: 'hidden',
                },
            },
        },
    },
});

// מערך של צבעים לכרטיסיות - מוגדר מחוץ לקומפוננטה
const cardColors = [
    { light: '#e3f2fd', main: '#2196f3', dark: '#1976d2', gradient: 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)' }, // כחול
    { light: '#e8f5e9', main: '#4caf50', dark: '#388e3c', gradient: 'linear-gradient(135deg, #c8e6c9 0%, #e8f5e9 100%)' }, // ירוק
    { light: '#fff3e0', main: '#ff9800', dark: '#f57c00', gradient: 'linear-gradient(135deg, #ffe0b2 0%, #fff3e0 100%)' }, // כתום
    { light: '#f3e5f5', main: '#9c27b0', dark: '#7b1fa2', gradient: 'linear-gradient(135deg, #e1bee7 0%, #f3e5f5 100%)' }, // סגול
    { light: '#e1f5fe', main: '#03a9f4', dark: '#0288d1', gradient: 'linear-gradient(135deg, #b3e5fc 0%, #e1f5fe 100%)' }, // תכלת
    { light: '#fce4ec', main: '#e91e63', dark: '#c2185b', gradient: 'linear-gradient(135deg, #f8bbd0 0%, #fce4ec 100%)' }, // ורוד
    { light: '#e8eaf6', main: '#3f51b5', dark: '#303f9f', gradient: 'linear-gradient(135deg, #c5cae9 0%, #e8eaf6 100%)' }, // אינדיגו
    { light: '#f1f8e9', main: '#8bc34a', dark: '#689f38', gradient: 'linear-gradient(135deg, #dcedc8 0%, #f1f8e9 100%)' }  // ירוק בהיר
];

const QuestionsGallery = () => {
    const { taskId, courseName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // קבלת השאלות מה-Redux store
    const questions = useSelector(state =>
        state.questions?.questions.filter(q => q.taskId === taskId) || []
    );

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState({
        number: '',
        text: '',
        commentOrFile: ''
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleEditClick = (question) => {
        setCurrentQuestion(question);
        setEditedQuestion({
            number: question.number,
            text: question.text,
            commentOrFile: question.commentOrFile || ''
        });
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (question) => {
        setQuestionToDelete(question);
        setDeleteDialogOpen(true);
    };

    const handleEditChange = (e) => {
        setEditedQuestion({
            ...editedQuestion,
            [e.target.name]: e.target.value
        });
    };

    const handleEditSave = () => {
        if (!editedQuestion.number || !editedQuestion.text) {
            setAlert({
                open: true,
                message: 'יש למלא מספר שאלה וטקסט שאלה',
                severity: 'error'
            });
            return;
        }

        const updatedQuestion = {
            ...currentQuestion,
            number: editedQuestion.number,
            text: editedQuestion.text,
            commentOrFile: editedQuestion.commentOrFile
        };

        dispatch(updateQuestion(updatedQuestion));
        setEditDialogOpen(false);
        setAlert({
            open: true,
            message: 'השאלה עודכנה בהצלחה',
            severity: 'success'
        });
    };

    const handleDeleteConfirm = () => {
        if (questionToDelete) {
            dispatch(deleteQuestion({ id: questionToDelete.id }));
            setDeleteDialogOpen(false);
            setAlert({
                open: true,
                message: 'השאלה נמחקה בהצלחה',
                severity: 'info'
            });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const handleBackToTaskList = () => {
        navigate(`/tasks/TaskList/${courseName}`);
    };

    const handleAddMoreQuestions = () => {
        navigate(`/tasks/add-questions/<span class="math-inline">\{taskId\}/course/</span>{courseName}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" dir="rtl" sx={{ mt: 4, mb: 6 }}>
                {/* הודעת התראה - תופיע רק כאשר alert.open הוא true */}
                <Snackbar
                    open={alert.open}
                    autoHideDuration={4000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseAlert}
                        severity={alert.severity}
                        elevation={6}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>

                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{
                                bgcolor: 'primary.main',
                                width: 56,
                                height: 56,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                            }}>
                                <QuestionIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: 'primary.main' }}>
                                    שאלות למטלה
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {taskId} | {questions.length} שאלות
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<ArrowBackIcon />}
                                onClick={handleBackToTaskList}
                                sx={{
                                    borderRadius: 2,
                                    py: 1,
                                    px: 2
                                }}
                            >
                                חזרה למטלות
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleAddMoreQuestions}
                                sx={{
                                    borderRadius: 2,
                                    py: 1,
                                    px: 2,
                                    boxShadow: 2,
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.2s'
                                }}
                            >
                                הוסף שאלות נוספות
                            </Button>
                        </Box>
                    </Box>

                    {questions.length === 0 ? (
                        <Paper
                            elevation={3}
                            sx={{
                                p: 5,
                                textAlign: 'center',
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                boxShadow: 3,
                                mt: 4
                            }}
                        >
                            <QuestionIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.7 }} />
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                לא נמצאו שאלות למטלה זו
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                ניתן להוסיף שאלות חדשות באמצעות לחיצה על כפתור "הוסף שאלות נוספות"
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleAddMoreQuestions}
                                sx={{
                                    mt: 2,
                                    borderRadius: 2,
                                    py: 1.5,
                                    px: 3,
                                    fontSize: '1.1rem'
                                }}
                            >
                                הוסף שאלות למטלה
                            </Button>
                        </Paper>
                    ) : (
                        <>
                            <Box sx={{
                                p: 3,
                                mt: 3,
                                mb: 4,
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                boxShadow: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                                    <QuestionIcon fontSize="large" />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        סה"כ {questions.length} שאלות במטלה
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ניתן לערוך או למחוק שאלות באמצעות הכפתורים בכל כרטיסיה
                                    </Typography>
                                </Box>
                            </Box>

                            <Grid container spacing={3}>
                                {questions.map((question, index) => {
                                    const colorIndex = index % cardColors.length;
                                    const cardColor = cardColors[colorIndex];

                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={question.id}>
                                            <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                                                <Card
                                                    elevation={4}
                                                    sx={{
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        borderRadius: 4,
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'translateY(-8px)',
                                                            boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                                                        },
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        background: cardColor.gradient,
                                                        border: `1px solid ${cardColor.light}`
                                                    }}
                                                >
                                                    {/* רקע דקורטיבי עליון */}
                                                    <Box
                                                        sx={{
                                                            height: '6px',
                                                            width: '100%',
                                                            bgcolor: cardColor.main,
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            zIndex: 1
                                                        }}
                                                    />

                                                    <CardHeader
                                                        avatar={
                                                            <Avatar
                                                                sx={{
                                                                    bgcolor: cardColor.main,
                                                                    color: 'white',
                                                                    fontWeight: 'bold',
                                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                                }}
                                                            >
                                                            </Avatar>
                                                        }
                                                    />
                                                </Card>
                                            </Zoom>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default QuestionsGallery;