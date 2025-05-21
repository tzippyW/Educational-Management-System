// יבוא ספריות ריאקט ו-Redux
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// יבוא רכיבי עיצוב של Material UI
import {
    TextField, Button, Grid, Typography, Container, Box, Card, CardContent,
    List, ListItem, ListItemIcon, ListItemText, IconButton, InputAdornment,
    Snackbar, Alert, Dialog, DialogContent, DialogActions, Avatar, Divider
} from '@mui/material';

// יבוא אייקונים
import {
    addQuestion, updateQuestion, deleteQuestion, addQuestionsToTask
} from './questionSlice';

import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CommentIcon from '@mui/icons-material/Comment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// הגדרת ערכת נושא בעברית עם צבעים מותאמים
const theme = createTheme({
    direction: 'rtl',
    typography: { fontFamily: '"Rubik", "Assistant", "Heebo", sans-serif' },
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#f50057' },
        success: { main: '#4caf50' },
        background: { default: '#f5f5f5' },
    },
});

// קומפוננטת AddQuestions - טופס לניהול שאלות במטלה
export const AddQuestions = () => {
    const { taskId, courseName } = useParams(); // קבלת מזהים מ-URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // שליפת שאלות מה-Redux store
    const taskQuestions = useSelector(state =>
        state.questions?.questions.filter(q => q.taskId === taskId) || []
    );

    // הגדרת סטייטים לניהול מצב
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ number: '', text: '', commentOrFile: '', taskId });
    const [editMode, setEditMode] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [lastAddedQuestion, setLastAddedQuestion] = useState(null);

    // כאשר משתנות השאלות ב-Redux, מעדכנים סטייט מקומי
    useEffect(() => { setQuestions(taskQuestions); }, [taskQuestions]);

    // שינוי ערך בשאלת טופס
    const handleChange = (e) => {
        setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
    };

    // סגירת התראה
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    // פתיחת התראה
    const showAlert = (message, severity = 'success') => {
        setAlert({ open: true, message, severity });
    };

    // הוספה או עדכון של שאלה
    const handleAddQuestion = () => {
        if (!newQuestion.number || !newQuestion.text) {
            showAlert('יש למלא מספר שאלה וטקסט שאלה', 'error');
            return;
        }
        const questionToAdd = { ...newQuestion, taskId };
        if (editMode) {
            dispatch(updateQuestion(questionToAdd));
            setEditMode(false);
            showAlert('השאלה עודכנה בהצלחה');
        } else {
            dispatch(addQuestion(questionToAdd));
            setLastAddedQuestion(questionToAdd);
            setSuccessDialogOpen(true);
            showAlert('השאלה נוספה בהצלחה');
        }
        setNewQuestion({ number: '', text: '', commentOrFile: '', taskId });
    };

    // עריכת שאלה קיימת
    const handleEditQuestion = (question) => {
        setNewQuestion({ ...question });
        setEditMode(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // מחיקת שאלה
    const handleDeleteQuestion = (id) => {
        dispatch(deleteQuestion({ id, taskId }));
        showAlert('השאלה נמחקה בהצלחה', 'info');
    };

    // שמירת כל השאלות שנכתבו למטלה
    const handleSaveAllQuestions = () => {
        if (questions.length === 0) {
            showAlert('אין שאלות לשמירה', 'warning');
            return;
        }
        dispatch(addQuestionsToTask({ taskId, questions }));
        showAlert('כל השאלות נשמרו בהצלחה!');
        setTimeout(() => navigate(`/tasks/task/questions-list`), 2000);
    };

    // סגירת חלון הצלחה
    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
    };

   // תיעוד JSX - תצוגת המשתמש בקומפוננטת AddQuestions

return (
    // עוטף את כל הממשק עם ערכת נושא מותאמת
    <ThemeProvider theme={theme}>
        <Container maxWidth="md" dir="rtl" sx={{ mt: 4, mb: 4 }}>

            {/* התראה קופצת (Snackbar) להודעות מערכת */}
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

            {/* דיאלוג הצלחה שמוצג לאחר הוספת שאלה */}
            <Dialog
                open={successDialogOpen}
                onClose={handleCloseSuccessDialog}
                maxWidth="md"
                PaperProps={{ sx: { borderRadius: 2, overflow: 'hidden', maxWidth: '600px', width: '100%' } }}
            >
                <Box sx={{ bgcolor: 'success.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon fontSize="large" />
                        <Typography variant="h6" fontWeight="bold">
                            השאלה נוספה בהצלחה!
                        </Typography>
                    </Box>
                    <IconButton onClick={handleCloseSuccessDialog} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* תוכן הדיאלוג: מציג מידע על השאלה שנוספה */}
                <DialogContent sx={{ p: 3 }}>
                    {lastAddedQuestion && (
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                    <NumbersIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        שאלה מספר {lastAddedQuestion.number}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        נוספה למטלה: {taskId}
                                    </Typography>
                                </Box>
                            </Box>

                            <Card variant="outlined" sx={{ mb: 2, p: 2, bgcolor: '#f8f8f8' }}>
                                <Typography variant="body1">
                                    {lastAddedQuestion.text}
                                </Typography>
                                {lastAddedQuestion.commentOrFile && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        <CommentIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                        {lastAddedQuestion.commentOrFile}
                                    </Typography>
                                )}
                            </Card>
                        </Box>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" paragraph align="center">
                        השאלה נוספה בהצלחה. תוכל להוסיף שאלות נוספות או לשמור את כל השאלות.
                    </Typography>
                </DialogContent>

                {/* כפתורים בדיאלוג: הוספה נוספת או שמירה של כל השאלות */}
                <DialogActions sx={{ p: 2, justifyContent: 'center', gap: 2 }}>
                    <Button variant="outlined" color="primary" onClick={handleCloseSuccessDialog} sx={{ px: 3, py: 1, borderRadius: 2, fontSize: '1rem' }}>
                        הוסף שאלה נוספת
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<SaveIcon />}
                        onClick={() => {
                            handleCloseSuccessDialog();
                            handleSaveAllQuestions();
                        }}
                        sx={{ px: 3, py: 1, borderRadius: 2, fontSize: '1rem', boxShadow: 2, '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}
                    >
                        שמור את כל השאלות
                    </Button>
                </DialogActions>
            </Dialog>

            {/* כרטיס טופס להוספת שאלה */}
            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
                <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <AssignmentIcon fontSize="large" />
                    <Typography variant="h5" component="h1" fontWeight="bold">
                        הוספת שאלות למטלה: {taskId}
                    </Typography>
                </Box>
                <CardContent>
                    <Grid container spacing={3}>
                        {/* שדה מספר שאלה */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="מספר שאלה"
                                name="number"
                                value={newQuestion.number}
                                onChange={handleChange}
                                variant="outlined"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><NumbersIcon color="primary" /></InputAdornment>) }}
                            />
                        </Grid>

                        {/* שדה טקסט שאלה */}
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
                                InputProps={{ startAdornment: (<InputAdornment position="start"><TextFieldsIcon color="primary" /></InputAdornment>) }}
                            />
                        </Grid>

                        {/* שדה הערה או קובץ */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="הערה על השאלה / הכנסת קובץ"
                                name="commentOrFile"
                                value={newQuestion.commentOrFile}
                                onChange={handleChange}
                                variant="outlined"
                                InputProps={{ startAdornment: (<InputAdornment position="start"><CommentIcon color="primary" /></InputAdornment>) }}
                            />
                        </Grid>

                        {/* כפתורים להוספה ושמירה */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddQuestion}
                                    sx={{ px: 3, py: 1.2, borderRadius: 2, fontSize: '1rem', boxShadow: 2, '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}
                                >
                                    {editMode ? 'עדכן שאלה' : 'שמור שאלה והוסף עוד'}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSaveAllQuestions}
                                    sx={{ px: 3, py: 1.2, borderRadius: 2, fontSize: '1rem', boxShadow: 2, '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}
                                >
                                    שמור שאלות ומעבר לרשימת מטלות
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* כרטיס המציג את רשימת השאלות שנוספו */}
            {questions.length > 0 && (
                <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            שאלות שהוספת:
                        </Typography>
                        <List>
                            {questions.map((q, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`${q.number}. ${q.text}`} secondary={q.commentOrFile} />
                                    <IconButton onClick={() => handleEditQuestion(q)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteQuestion(q.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            )}
        </Container>
    </ThemeProvider>
)};

export default AddQuestions;