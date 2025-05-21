import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Button, 
    Box, 
    Typography, 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    CardActions, 
    Divider, 
    Chip, 
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar,
    Snackbar,
    Alert,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import { deleteTask, updatedTask } from './taskSlice';
import { TextSnippet } from '@mui/icons-material';

// פונקציה להמרת סוג המטלה לעברית
const getTaskTypeHebrew = (type) => {
    const types = {
        'quiz': 'בוחן',
        'assignment': 'מטלה',
        'project': 'פרויקט',
        'exam': 'מבחן',
        'Test': 'מבחן',
        'Homework': 'שיעורי בית',
        'Examiner': 'בוחן'
    };
    return types[type] || 'מטלה';
};

// פונקציה להמרת סוג המטלה לצבע
const getTaskTypeColor = (type) => {
    const colors = {
        'quiz': 'info',
        'assignment': 'primary',
        'project': 'success',
        'exam': 'error',
        'Test': 'error',
        'Homework': 'primary',
        'Examiner': 'info'
    };
    return colors[type] || 'default';
};

// פונקציה להמרת סוג המטלה לאייקון
const getTaskTypeIcon = (type) => {
    const icons = {
        'quiz': <QuestionMarkIcon />,
        'assignment': <AssignmentIcon />,
        'project': <BookIcon />,
        'exam': <SchoolIcon />,
        'Test': <SchoolIcon />,
        'Homework': <AssignmentIcon />,
        'Examiner': <QuestionMarkIcon />
    };
    return icons[type] || <AssignmentIcon />;
};

const TaskList = () => {
    const { courseName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.taskSlice.tasks || []);
    
    // סינון המטלות לפי שם הקורס
    const filteredTasks = courseName 
        ? tasks.filter((task) => task.course === courseName)
        : tasks;

    // מצב לדיאלוג עריכה
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [editedTask, setEditedTask] = useState({
        name: '',
        desc: '',
        lessonId: '',
        finalDate: '',
        instructionsFile: '',
        type: '',
        course: ''
    });

    // מצב לדיאלוג הגשות
    const [submissionsDialogOpen, setSubmissionsDialogOpen] = useState(false);
    const [currentTaskSubmissions, setCurrentTaskSubmissions] = useState(null);
    // נתוני תלמידות לדוגמה - בפרויקט אמיתי אלו יגיעו מהשרת
    const [students, setStudents] = useState([
        { id: 1, name: "שירה כהן", submitted: true, submissionDate: "2023-06-15", grade: null },
        { id: 2, name: "מיכל לוי", submitted: true, submissionDate: "2023-06-14", grade: null },
        { id: 3, name: "רותם אברהם", submitted: false, submissionDate: null, grade: null },
        { id: 4, name: "נועה גולן", submitted: true, submissionDate: "2023-06-16", grade: null },
        { id: 5, name: "יעל דוד", submitted: false, submissionDate: null, grade: null },
    ]);

    // משתני מצב לדיאלוגים נוספים
    const [viewSubmissionDialogOpen, setViewSubmissionDialogOpen] = useState(false);
    const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [gradeValue, setGradeValue] = useState('');
    const [gradeComment, setGradeComment] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [currentStudents, setCurrentStudents] = useState([]);

    // פונקציה לפתיחת דיאלוג צפייה בהגשה
    const handleViewSubmission = (student) => {
        setSelectedStudent(student);
        setViewSubmissionDialogOpen(true);
    };

    // פונקציה לפתיחת דיאלוג הזנת/עדכון ציון
    const handleOpenGradeDialog = (student) => {
        setSelectedStudent(student);
        // טעינת הציון הקיים אם יש
        setGradeValue(student.grade !== undefined && student.grade !== null ? student.grade : '');
        // טעינת ההערות הקיימות אם יש
        setGradeComment(student.comment || '');
        setGradeDialogOpen(true);
    };

    // פונקציה להגשת ציון
    const handleSubmitGrade = () => {
        // בדיקה שהציון תקין
        if (gradeValue === '' || isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
            setSnackbar({ open: true, message: 'אנא הזן ציון תקין בין 0 ל-100', severity: 'error' });
            return;
        }
        
        // עדכון מקומי של הציון
        const updatedStudents = currentStudents.map(student => {
            if (student.id === selectedStudent.id) {
                return {
                    ...student,
                    grade: gradeValue,
                    comment: gradeComment
                };
            }
            return student;
        });
        
        // עדכון המצב
        setCurrentStudents(updatedStudents);
        
        // סגירת הדיאלוג
        setGradeDialogOpen(false);
        
        // הצגת הודעת הצלחה
        const isUpdate = selectedStudent.grade !== undefined && selectedStudent.grade !== null;
        setSnackbar({ 
            open: true, 
            message: isUpdate ? 'הציון עודכן בהצלחה' : 'הציון נשמר בהצלחה', 
            severity: 'success' 
        });
        
        console.log(isUpdate ? 'ציון עודכן:' : 'ציון נשמר:', selectedStudent.name, gradeValue, gradeComment);
        
        // בפרויקט אמיתי, כאן תשלח את הציון לשרת
        // api.updateGrade(selectedStudent.id, taskId, gradeValue, gradeComment);
    };

    // פתיחת דיאלוג עריכה
    const handleEditClick = (task) => {
        setCurrentTask(task);
        setEditedTask({
            id: task.id,
            name: task.name,
            desc: task.desc,
            lessonId: task.lessonId,
            finalDate: task.finalDate,
            instructionsFile: task.instructionsFile,
            type: task.type,
            course: task.course
        });
        setEditDialogOpen(true);
    };

    // שמירת שינויים בעריכה
    const handleSaveEdit = () => {
        dispatch(updatedTask(editedTask));
        setEditDialogOpen(false);
    };

    // מחיקת מטלה
    const handleDeleteTask = (taskId) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק מטלה זו?')) {
            dispatch(deleteTask(taskId));
        }
    };

    // עדכון שדות בטופס העריכה
    const handleEditChange = (e) => {
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value
        });
    };

    // טיפול בהעלאת קובץ
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEditedTask({
                ...editedTask,
                instructionsFile: e.target.files[0].name
            });
        }
    };

    const taskTypes = [
        { value: 'Test', label: 'מבחן' },
        { value: 'Homework', label: 'שיעורי בית' },
        { value: 'Examiner', label: 'בוחן' },
        { value: 'quiz', label: 'בוחן' },
        { value: 'assignment', label: 'מטלה' },
        { value: 'project', label: 'פרויקט' },
        { value: 'exam', label: 'מבחן' }
    ];

    // פתיחת דיאלוג הגשות
    const handleViewSubmissions = (task) => {
        setCurrentTaskSubmissions(task);
        
        // העתקת רשימת התלמידים כדי לא לשנות את המקור
        setCurrentStudents([...students]);
        
        setSubmissionsDialogOpen(true);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            {/* כותרת וכפתור הוספת מטלה */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: 2,
                    background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)'
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    {courseName && (
                        <Typography 
                            variant="h4" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 'bold',
                                color: '#2c3e50',
                                mb: 3
                            }}
                        >
                            מטלות עבור {courseName}
                        </Typography>
                    )}
                    
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => navigate(`/tasks/add-task/${courseName || ''}`)}
                        sx={{ 
                            py: 1.5, 
                            px: 4, 
                            borderRadius: 2,
                            fontSize: '1.1rem',
                            boxShadow: 3,
                            '& .MuiButton-startIcon': {
                                marginRight: '12px'
                            }
                        }}
                    >
                        הוסף מטלה חדשה
                    </Button>
                </Box>
            </Paper>

            {/* רשימת המטלות - 2 כרטיסיות בשורה */}
            <Grid container spacing={3}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <Grid item xs={12} md={6} key={task.id}>
                            <Card 
                                elevation={4} 
                                sx={{ 
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 8
                                    }
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        bgcolor: 'primary.main', 
                                        color: 'white', 
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    {getTaskTypeIcon(task.type)}
                                    <Typography variant="h5" component="h2" fontWeight="bold">
                                        {task.name}
                                    </Typography>
                                </Box>
                                
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Chip 
                                            label={getTaskTypeHebrew(task.type)} 
                                            color={getTaskTypeColor(task.type)}
                                            size="medium"
                                            icon={getTaskTypeIcon(task.type)}
                                            sx={{ fontWeight: 'bold', mb: 2 }}
                                        />
                                    </Box>
                                    
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        {task.desc}
                                    </Typography>
                                    
                                    <Divider sx={{ my: 2 }} />
                                    
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: '120px' }}>
                                                    מספר שיעור:
                                                </Typography>
                                                <Typography variant="body1">
                                                    {task.lessonId}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: '120px' }}>
                                                    תאריך סופי:
                                                </Typography>
                                                <Typography variant="body1">
                                                    {task.finalDate}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: '120px' }}>
                                                    קובץ הוראות:
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <AttachFileIcon sx={{ mr: 1, color: 'primary.main' }} />
                                                    <Typography variant="body1">
                                                        {task.instructionsFile || "אין קובץ הוראות"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                
                                <Divider />
                                
                                <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleEditClick(task)}
                                            sx={{ 
                                                mr: 1,
                                                '& .MuiButton-startIcon': {
                                                    marginRight: '8px'
                                                }
                                            }}
                                        >
                                            ערוך
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteTask(task.id)}
                                            sx={{ 
                                                '& .MuiButton-startIcon': {
                                                    marginRight: '8px'
                                                }
                                            }}
                                        >
                                            מחק
                                        </Button>
                                    </Box>
                                    
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<QuestionMarkIcon />}
                                            onClick={() => navigate(`/tasks/add-questions/${task.name}/course/${task.course}`)}
                                            sx={{ 
                                                ml: 1,
                                                '& .MuiButton-startIcon': {
                                                    marginRight: '8px'
                                                }
                                            }}
                                        >
                                            שאלות
                                        </Button>
                                    </Box>

                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<TextSnippet />}
                                            onClick={() => handleViewSubmissions(task)}
                                            sx={{ 
                                                ml: 1,
                                                '& .MuiButton-startIcon': {
                                                    marginRight: '8px'
                                                }
                                            }}
                                        >
                                            צפיה בהגשות
                                        </Button>
                                    </Box>

                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                            <Typography variant="h6">
                                לא נמצאו מטלות לקורס זה. ניתן להוסיף מטלה חדשה באמצעות הכפתור למעלה.
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            {/* דיאלוג עריכת מטלה */}
            <Dialog 
                open={editDialogOpen} 
                onClose={() => setEditDialogOpen(false)}
                fullWidth
                maxWidth="md"
                dir="rtl"
            >
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                    עריכת מטלה
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label="שם המטלה"
                                name="name"
                                value={editedTask.name}
                                onChange={handleEditChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label="קורס"
                                name="course"
                                value={editedTask.course}
                                onChange={handleEditChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="תיאור המטלה"
                                name="desc"
                                value={editedTask.desc}
                                onChange={handleEditChange}
                                variant="outlined"
                                multiline
                                rows={3}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="מספר שיעור"
                                name="lessonId"
                                value={editedTask.lessonId}
                                onChange={handleEditChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="תאריך סופי"
                                name="finalDate"
                                value={editedTask.finalDate}
                                onChange={handleEditChange}
                                variant="outlined"
                                type="date"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="קובץ הוראות"
                                name="instructionsFile"
                                value={editedTask.instructionsFile}
                                onChange={handleEditChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="demo-simple-select-label">סוג המטלה</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editedTask.type}
                                    onChange={handleEditChange}
                                    label="סוג המטלה"
                                    name="type"
                                >
                                    {taskTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} color="primary">
                        בטל
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        שמור
                    </Button>
                </DialogActions>
            </Dialog>
            {/* דיאלוג צפייה בהגשות */}
            <Dialog 
                open={submissionsDialogOpen} 
                onClose={() => setSubmissionsDialogOpen(false)}
                fullWidth
                maxWidth="md"
                dir="rtl"
            >
                <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <TextSnippet sx={{ mr: 1 }} />
                    הגשות למטלה: {currentTaskSubmissions?.name}
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    {students.length > 0 ? (
                        <>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body1">
                                    סה"כ הגישו: {students.filter(s => s.submitted).length} מתוך {students.length} תלמידות
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                {students.map((student) => (
                                    <Grid item xs={12} key={student.id}>
                                        <Paper 
                                            elevation={2} 
                                            sx={{ 
                                                p: 2, 
                                                borderRight: student.submitted ? '4px solid #4caf50' : '4px solid #f44336',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ bgcolor: student.submitted ? 'success.main' : 'error.main', mr: 2 }}>
                                                    {student.name.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                        {student.name}
                                                    </Typography>
                                                    {student.submitted ? (
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                הוגש בתאריך: {student.submissionDate}
                                                            </Typography>
                                                            {student.grade !== undefined && student.grade !== null && (
                                                                <Typography variant="body2" color="primary" fontWeight="bold">
                                                                    ציון: {student.grade}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    ) : (
                                                        <Typography variant="body2" color="error">
                                                            טרם הוגש
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                            <Box>
                                                {student.submitted && (
                                                    <>
                                                        <Button 
                                                            variant="outlined" 
                                                            size="small" 
                                                            startIcon={<AttachFileIcon />}
                                                            sx={{ mr: 1 }}
                                                            onClick={() => handleViewSubmission(student)}
                                                        >
                                                            צפה בהגשה
                                                        </Button>
                                                        <Button 
                                                            variant="contained" 
                                                            color="primary" 
                                                            size="small"
                                                            startIcon={<EditIcon />}
                                                            onClick={() => handleOpenGradeDialog(student)}
                                                        >
                                                            {student.grade !== undefined && student.grade !== null ? 'עדכן ציון' : 'הזן ציון'}
                                                        </Button>
                                                    </>
                                                )}
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="body1" align="center">
                            אין תלמידות רשומות למטלה זו
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSubmissionsDialogOpen(false)} color="primary">
                        סגור
                    </Button>
                </DialogActions>
            </Dialog>
            {/* דיאלוג צפייה בהגשה */}
            <Dialog 
                open={viewSubmissionDialogOpen} 
                onClose={() => setViewSubmissionDialogOpen(false)}
                fullWidth
                maxWidth="md"
                dir="rtl"
            >
                <DialogTitle sx={{ bgcolor: 'info.main', color: 'white', fontWeight: 'bold' }}>
                    צפייה בהגשה - {selectedStudent?.name}
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            פרטי הגשה:
                        </Typography>
                        <Typography variant="body2">
                            תאריך הגשה: {selectedStudent?.submissionDate}
                        </Typography>
                        {selectedStudent?.grade && (
                            <Typography variant="body2">
                                ציון: {selectedStudent?.grade}
                            </Typography>
                        )}
                    </Box>
        
                    <Divider sx={{ mb: 3 }} />
        
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        תשובות התלמיד/ה:
                    </Typography>
        
                    {/* כאן יוצגו התשובות האמיתיות בפרויקט אמיתי */}
                    <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: '#f9f9f9' }}>
                        <Typography variant="body2" gutterBottom>
                            <strong>שאלה 1:</strong> מהם העקרונות הבסיסיים של תכנות מונחה עצמים?
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2, borderRight: '2px solid #1976d2', pr: 2 }}>
                            העקרונות הבסיסיים של תכנות מונחה עצמים הם: הכמסה (Encapsulation), הורשה (Inheritance), פולימורפיזם (Polymorphism) והפשטה (Abstraction).
                            אלו מאפשרים לנו לבנות קוד מודולרי, קל לתחזוקה ולהרחבה.
                        </Typography>
                    </Paper>
        
                    <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: '#f9f9f9' }}>
                        <Typography variant="body2" gutterBottom>
                            <strong>שאלה 2:</strong> הסבר את ההבדל בין ממשק (Interface) למחלקה מופשטת (Abstract Class).
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2, borderRight: '2px solid #1976d2', pr: 2 }}>
                            ממשק מגדיר חוזה שמחלקות צריכות ליישם, אך אינו מכיל מימוש. מחלקה מופשטת יכולה להכיל מימוש חלקי ומתודות מופשטות.
                            ממשק מאפשר הורשה מרובה, בעוד מחלקה מופשטת מאפשרת רק הורשה יחידה.
                        </Typography>
                    </Paper>
        
                    {/* קבצים מצורפים */}
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
                        קבצים מצורפים:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" startIcon={<AttachFileIcon />}>
                            מטלה_מסכמת.pdf
                        </Button>
                        <Button variant="outlined" startIcon={<AttachFileIcon />}>
                            קוד_מקור.zip
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewSubmissionDialogOpen(false)} color="primary">
                        סגור
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => {
                            setViewSubmissionDialogOpen(false);
                            handleOpenGradeDialog(selectedStudent);
                        }}
                    >
                        הזן ציון
                    </Button>
                </DialogActions>
            </Dialog>

            {/* דיאלוג הזנת ציון */}
            <Dialog 
                open={gradeDialogOpen} 
                onClose={() => setGradeDialogOpen(false)}
                fullWidth
                maxWidth="sm"
                dir="rtl"
            >
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                    {selectedStudent?.grade !== undefined && selectedStudent?.grade !== null 
                        ? `עדכון ציון - ${selectedStudent?.name}` 
                        : `הזנת ציון - ${selectedStudent?.name}`}
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                        תאריך הגשה: {selectedStudent?.submissionDate}
                    </Typography>
        
                    <TextField
                        fullWidth
                        label="ציון"
                        type="number"
                        value={gradeValue}
                        onChange={(e) => setGradeValue(e.target.value)}
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        sx={{ mt: 3, mb: 2 }}
                    />
        
                    <TextField
                        fullWidth
                        label="הערות למטלה"
                        multiline
                        rows={4}
                        value={gradeComment}
                        onChange={(e) => setGradeComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setGradeDialogOpen(false)} color="primary">
                        בטל
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleSubmitGrade}
                    >
                        שמור ציון
                    </Button>
                </DialogActions>
            </Dialog>

            {/* סנאקבר להודעות */}
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={() => setSnackbar({...snackbar, open: false})}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setSnackbar({...snackbar, open: false})} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TaskList;
