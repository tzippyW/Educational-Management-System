import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    InputAdornment,
    Paper,
    Container,
    Avatar,
    Zoom,
    Tooltip,
    Alert,
    Snackbar,
    Fab
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    QuestionAnswer as QuestionIcon,
    Numbers as NumbersIcon,
    TextFields as TextFieldsIcon,
    Comment as CommentIcon,
    Save as SaveIcon,
    Close as CloseIcon,
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    Check as CheckIcon
} from '@mui/icons-material';
import { updateQuestion, deleteQuestion, getQuestionsByTaskId, addQuestion } from './questionSlice';
import { updatedTask } from './taskSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
        },
    },
});

const QuestionsList = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const questions = useSelector(state => getQuestionsByTaskId(state, taskId));
    const task = useSelector(state => state.taskSlice?.tasks?.find(t => t.id === taskId));

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState({
        number: '',
        text: '',
        commentOrFile: ''
    });
    const [newQuestion, setNewQuestion] = useState({
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
    const [confirmSaveDialogOpen, setConfirmSaveDialogOpen] = useState(false);

    // בדיקה אם המטלה קיימת
    useEffect(() => {
        if (!task) {
            setAlert({
                open: true,
                message: 'לא נמצאה מטלה עם המזהה הזה',
                severity: 'error'
            });
        }
    }, [task]);

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

    const handleNewQuestionChange = (e) => {
        setNewQuestion({
            ...newQuestion,
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

    const handleAddQuestion = () => {
        if (!newQuestion.number || !newQuestion.text) {
            setAlert({
                open: true,
                message: 'יש למלא מספר שאלה וטקסט שאלה',
                severity: 'error'
            });
            return;
        }

        const question = {
            id: Date.now().toString(),
            taskId: taskId,
            number: newQuestion.number,
            text: newQuestion.text,
            commentOrFile: newQuestion.commentOrFile || ''
        };

        dispatch(addQuestion(question));
        setAddDialogOpen(false);
        setNewQuestion({
            number: '',
            text: '',
            commentOrFile: ''
        });
        setAlert({
            open: true,
            message: 'השאלה נוספה בהצלחה',
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

    const handleBack = () => {
        navigate(`/tasks/TaskList/${task?.course || ''}`);
    };

    // פונקציה חדשה לשמירת המטלה והחזרה לרשימת המטלות
    const handleSaveTaskAndReturn = () => {
        if (questions.length === 0) {
            setAlert({
                open: true,
                message: 'לא ניתן לשמור מטלה ללא שאלות',
                severity: 'warning'
            });
            return;
        }
        
        setConfirmSaveDialogOpen(true);
    };

    // פונקציה לאישור שמירת המטלה
    const handleConfirmSaveTask = () => {
        if (task) {
            // עדכון המטלה עם מספר השאלות שנוספו
            const updatedTaskData = {
                ...task,
                questionsCount: questions.length,
                lastUpdated: new Date().toISOString()
            };
            
            dispatch(updatedTask(updatedTaskData));
            
            setConfirmSaveDialogOpen(false);
            setAlert({
                open: true,
                message: 'המטלה נשמרה בהצלחה עם ' + questions.length + ' שאלות',
                severity: 'success'
            });
            
            // המתנה קצרה לפני ניווט בחזרה
            setTimeout(() => {
                navigate(`/tasks/TaskList/${task.course}`);
            }, 1500);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" dir="rtl" sx={{ mt: 4, mb: 4 }}>
                <Snackbar
                    open={alert.open}
                    autoHideDuration={4000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseAlert} severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Snackbar>

                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        mb: 4,
                        background: 'linear-gradient(to right, #f5f7fa, #e4e7eb)'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <QuestionIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                            <Typography variant="h4" component="h1" fontWeight="bold">
                                שאלות למטלה: {task ? task.name : taskId}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {/* כפתור חדש לשמירת המטלה */}
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckIcon />}
                                onClick={handleSaveTaskAndReturn}
                            >
                                שמור מטלה וחזור
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<ArrowBackIcon />}
                                onClick={handleBack}
                            >
                                חזרה ללא שמירה
                            </Button>
                        </Box>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        כאן תוכל לראות, לערוך ולמחוק את השאלות שהוספת למטלה זו.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        מספר שאלות: {questions.length}
                    </Typography>
                </Paper>

                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'fixed', bottom: 20, right: 20 }}
                    onClick={() => setAddDialogOpen(true)}
                >
                    <AddIcon />
                </Fab>

                {questions.length === 0 ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 5,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 1
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            לא נמצאו שאלות למטלה זו
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => setAddDialogOpen(true)}
                            sx={{ mt: 2 }}
                        >
                            הוסף שאלה חדשה
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {questions.map((question, index) => (
                            <Grid item xs={12} md={6} key={question.id}>
                                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 2,
                                            boxShadow: 3,
                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: 6
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                py: 1.5,
                                                px: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 1 }}>
                                                    <NumbersIcon />
                                                </Avatar>
                                                <Typography variant="h6" fontWeight="bold">
                                                    שאלה מספר {question.number}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Tooltip title="ערוך שאלה">
                                                    <IconButton
                                                        onClick={() => handleEditClick(question)}
                                                        sx={{ color: 'white' }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="מחק שאלה">
                                                    <IconButton
                                                        onClick={() => handleDeleteClick(question)}
                                                        sx={{ color: 'white' }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                            <Typography
                                                variant="body1"
                                                paragraph
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: '1.1rem',
                                                    mb: 3
                                                }}
                                            >
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
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* דיאלוג אישור שמירת המטלה */}
                <Dialog
                    open={confirmSaveDialogOpen}
                    onClose={() => setConfirmSaveDialogOpen(false)}
                >
                    <DialogTitle>אישור שמירת המטלה</DialogTitle>
                    <DialogContent>
                        <Typography>
                            האם אתה בטוח שברצונך לשמור את המטלה עם {questions.length} שאלות ולחזור לרשימת המטלות?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmSaveDialogOpen(false)}>ביטול</Button>
                        <Button 
                            variant="contained" 
                            color="success" 
                            onClick={handleConfirmSaveTask}
                            startIcon={<CheckIcon />}
                        >
                            שמור וחזור
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* דיאלוג הוספת שאלה חדשה */}
                <Dialog
                    open={addDialogOpen}
                    onClose={() => setAddDialogOpen(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            overflow: 'hidden'
                        }
                    }}
                >
                    <Box sx={{
                        bgcolor: 'secondary.main',
                        color: 'white',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AddIcon fontSize="large" />
                            <Typography variant="h6" fontWeight="bold">
                                הוספת שאלה חדשה
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={() => setAddDialogOpen(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={3} sx={{ mt: 0 }}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="מספר שאלה"
                                    name="number"
                                    value={newQuestion.number}
                                    onChange={handleNewQuestionChange}
                                    variant="outlined"
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NumbersIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    label="השאלה"
                                    name="text"
                                    value={newQuestion.text}
                                    onChange={handleNewQuestionChange}
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TextFieldsIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="הערה על השאלה / הכנסת קובץ"
                                    name="commentOrFile"
                                    value={newQuestion.commentOrFile}
                                    onChange={handleNewQuestionChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CommentIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={() => setAddDialogOpen(false)}
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                fontSize: '1rem'
                            }}
                        >
                            ביטול
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleAddQuestion}
                            startIcon={<AddIcon />}
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                fontSize: '1rem',
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 4,
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            הוסף שאלה
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* דיאלוג עריכת שאלה */}
                <Dialog
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            overflow: 'hidden'
                        }
                    }}
                >
                    <Box sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EditIcon fontSize="large" />
                            <Typography variant="h6" fontWeight="bold">
                                עריכת שאלה
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={() => setEditDialogOpen(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogContent sx={{ p: 3 }}>
                        <Grid container spacing={3} sx={{ mt: 0 }}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="מספר שאלה"
                                    name="number"
                                    value={editedQuestion.number}
                                    onChange={handleEditChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NumbersIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    label="השאלה"
                                    name="text"
                                    value={editedQuestion.text}
                                    onChange={handleEditChange}
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TextFieldsIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="הערה על השאלה / הכנסת קובץ"
                                    name="commentOrFile"
                                    value={editedQuestion.commentOrFile}
                                    onChange={handleEditChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CommentIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={() => setEditDialogOpen(false)}
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                fontSize: '1rem'
                            }}
                        >
                            ביטול
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEditSave}
                            startIcon={<SaveIcon />}
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                fontSize: '1rem',
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 4,
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            שמור שינויים
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* דיאלוג מחיקת שאלה */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            overflow: 'hidden'
                        }
                    }}
                >
                    <Box sx={{
                        bgcolor: 'error.main',
                        color: 'white',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <DeleteIcon fontSize="large" />
                        <Typography variant="h6" fontWeight="bold">
                            אישור מחיקת שאלה
                        </Typography>
                    </Box>
                    <DialogContent sx={{ p: 3, pt: 3 }}>
                        <Typography variant="body1" paragraph>
                            האם אתה בטוח שברצונך למחוק את השאלה הבאה?
                        </Typography>
                        {questionToDelete && (
                            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8f8f8' }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    שאלה מספר {questionToDelete.number}:
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {questionToDelete.text}
                                </Typography>
                            </Paper>
                        )}
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            פעולה זו אינה ניתנת לביטול.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={() => setDeleteDialogOpen(false)}
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                fontSize: '1rem'
                            }}
                        >
                            ביטול
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteConfirm}
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                fontSize: '1rem',
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 4,
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            מחק
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
};

export default QuestionsList;

