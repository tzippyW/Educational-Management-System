import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
    Button,
    Box,
    Typography,
    Divider,
    Chip,
    Stack,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

const getTaskTypeHebrew = (type) => {
    const types = {
        'quiz': 'בוחן',
        'assignment': 'מטלה',
        'project': 'פרויקט',
        'exam': 'מבחן',
        'Test': 'מבחן',
        'Homework': 'שיעורי בית',
        'Examiner': 'בוחן',
    };
    return types[type] || 'מטלה';
};

const getTaskTypeColor = (type) => {
    const colors = {
        'quiz': 'info',
        'assignment': 'primary',
        'project': 'success',
        'exam': 'error',
        'Test': 'error',
        'Homework': 'primary',
        'Examiner': 'info',
    };
    return colors[type] || 'default';
};

const getTaskTypeIcon = (type) => {
    const icons = {
        'quiz': <QuestionMarkIcon />,
        'assignment': <AssignmentIcon />,
        'project': <BookIcon />,
        'exam': <SchoolIcon />,
        'Test': <SchoolIcon />,
        'Homework': <AssignmentIcon />,
        'Examiner': <QuestionMarkIcon />,
    };
    return icons[type] || <AssignmentIcon />;
};

const StudentTasks = () => {
    // שימוש ישיר בסלקטור במקום לייבא פונקציה
    const tasks = useSelector((state) => state.taskSlice?.tasks || []);
    console.log("Tasks from Redux:", tasks); // לוג לבדיקה
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [statusFilter, setStatusFilter] = useState('all');
    const [openOverdueDialog, setOpenOverdueDialog] = useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [lastSubmittedTask, setLastSubmittedTask] = useState(null);
    const [loading, setLoading] = useState(false); // שינוי מ-true ל-false
    const [error, setError] = useState(null);

    // הוספת useEffect לטיפול בטעינה
    useEffect(() => {
        try {
            console.log("Component mounted, tasks:", tasks);
            setLoading(false);
        } catch (err) {
            console.error("Error loading tasks:", err);
            setError("אירעה שגיאה בטעינת המטלות");
            setLoading(false);
        }
    }, [tasks]);

    // שיפור הפונקציה isPastDue כך שתשתמש ב-dayjs
    const isPastDue = (finalDate) => dayjs(finalDate).isBefore(dayjs());

    const getTaskStatus = (task) => {
        if (task.isSubmitted) return 'submitted';
        if (isPastDue(task.finalDate)) return 'overdue';
        return 'not_submitted';
    };

    const overdueTasks = useMemo(() => {
        return tasks.filter((task) => isPastDue(task.finalDate) && !task.isSubmitted);
    }, [tasks]);

    useEffect(() => {
        if (overdueTasks.length > 0) {
            setOpenOverdueDialog(true);
        }
    }, [overdueTasks]);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const status = getTaskStatus(task);
            return statusFilter === 'all' || status === statusFilter;
        });
    }, [tasks, statusFilter]);

    // פונקציה חדשה לטיפול בהגשת מטלה מוצלחת
    const handleTaskSubmitted = (task) => {
        setLastSubmittedTask(task);
        setOpenSuccessDialog(true);
    };

    // הוספת טיפול במצבי טעינה ושגיאות
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>טוען מטלות...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={4}>
                <Alert severity="error">{error}</Alert>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
                    נסה שוב
                </Button>
            </Box>
        );
    }

    // הוספת בדיקה אם tasks הוא undefined או ריק
    if (!tasks || tasks.length === 0) {
        return (
            <Box p={4}>
                <Alert severity="info">אין מטלות להצגה</Alert>
            </Box>
        );
    }

    console.log("Rendering StudentTasks component with tasks:", tasks);
    console.log("Filtered tasks:", filteredTasks);

    return (
        <Box p={4}>
            {/* דיאלוג הצלחה חדש */}
            <Dialog open={openSuccessDialog} onClose={() => handleTaskSubmitted(true)}>
                <DialogTitle sx={{ textAlign: 'center' }}>המטלה הוגשה בהצלחה!</DialogTitle>
                <DialogContent>
                    {lastSubmittedTask && (
                        <Typography>
                            המטלה "{lastSubmittedTask.name}" הוגשה בהצלחה. תודה!
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleTaskSubmitted(true)}>סגור</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openOverdueDialog} onClose={() => setOpenOverdueDialog(false)} fullWidth maxWidth="md">
                <DialogTitle sx={{ fontSize: '1.25rem', textAlign: 'center' }}>מטלות באיחור</DialogTitle>
                <DialogContent dividers>
                    {overdueTasks.length === 0 && (
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                            אין מטלות באיחור.
                        </Typography>
                    )}

                    {overdueTasks.map((task) => {
                        if (!task || !task.id) {
                            console.error('Task or task ID is undefined:', task);
                            return null;
                        }

                        const overdue = isPastDue(task.finalDate);
                        const taskSubmitted = task.isSubmitted;

                        return (
                            <Box
                                key={task.id}
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                }}
                                dir="rtl"
                            >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {getTaskTypeIcon(task.type)}
                                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '0.875rem' }}>
                                        {task.name}
                                    </Typography>
                                    <Chip label={getTaskTypeHebrew(task.type)} color={getTaskTypeColor(task.type)} size="small" />
                                </Stack>

                                <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                        <strong>קורס:</strong> {task.course}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                        <strong>שיעור:</strong> {task.lessonId}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                        <strong>תיאור:</strong> {task.desc}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                        <strong>תאריך:</strong> {task.finalDate}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                        <strong>קובץ:</strong> {task.instructionsFile}
                                    </Typography>
                                </Stack>

                                <Box>
                                    {overdue && !taskSubmitted && (
                                        <Typography color="error" fontWeight="bold" sx={{ fontSize: '0.75rem' }}>
                                            ⚠ עבר זמן ההגשה!
                                        </Typography>
                                    )}
                                    {!taskSubmitted ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{ mt: 1, width: '100px', height: '30px' }}
                                            onClick={() => navigate(`/tasks/task/${task.id}/questions`)}
                                        >
                                            השלמת מטלה
                                        </Button>
                                    ) : (
                                        <Chip label="הוגש ✅" color="success" variant="outlined" sx={{ fontSize: '0.60rem', mt: 1 }} />
                                    )}
                                </Box>
                            </Box>
                        );
                    })}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-start' }}>
                    <Button onClick={() => setOpenOverdueDialog(false)} sx={{ fontSize: '0.75rem' }}>
                        סגור
                    </Button>
                </DialogActions>
            </Dialog>

            <Tabs
                value={statusFilter}
                onChange={(e, newValue) => setStatusFilter(newValue)}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="הכל" value="all" />
                <Tab label="הוגשו" value="submitted" />
                <Tab label="לא הוגשו" value="not_submitted" />
                <Tab label="איחור" value="overdue" />
            </Tabs>

            <Box mt={4}>
                {filteredTasks.length === 0 && (
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        אין מטלות להצגה.
                    </Typography>
                )}

                {filteredTasks.map((task) => {
                    if (!task || !task.id) {
                        console.error('Task or task ID is undefined:', task);
                        return null;
                    }

                    const overdue = isPastDue(task.finalDate);
                    const taskSubmitted = task.isSubmitted;

                    return (
                        <Box
                            key={task.id}
                            sx={{
                                mb: 2,
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 2,
                            }}
                            dir="rtl"
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                {getTaskTypeIcon(task.type)}
                                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '0.875rem' }}>
                                    {task.name}
                                </Typography>
                                <Chip label={getTaskTypeHebrew(task.type)} color={getTaskTypeColor(task.type)} size="small" />
                            </Stack>

                            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                    <strong>קורס:</strong> {task.course}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                    <strong>שיעור:</strong> {task.lessonId}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                    <strong>תיאור:</strong> {task.desc}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                    <strong>תאריך:</strong> {task.finalDate}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                    <strong>קובץ:</strong> {task.instructionsFile}
                                </Typography>
                            </Stack>

                            <Box>
                                {overdue && !taskSubmitted && (
                                    <Typography color="error" fontWeight="bold" sx={{ fontSize: '0.75rem' }}>
                                        ⚠ עבר זמן ההגשה!
                                    </Typography>
                                )}
                                {!taskSubmitted ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{ mt: 1, width: '100px', height: '30px' }}
                                        onClick={() => navigate(`/tasks/task/${task.id}/questions`)}
                                    >
                                        השלמת מטלה
                                    </Button>
                                ) : (
                                    <Chip label="הוגש ✅" color="success" variant="outlined" sx={{ fontSize: '0.60rem', mt: 1 }} />
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default StudentTasks;
