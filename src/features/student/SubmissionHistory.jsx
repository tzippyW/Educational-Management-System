import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Chip, Stack } from '@mui/material';
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
        'Examiner': 'בוחן'
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
        'Examiner': 'info'
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
        'Examiner': <QuestionMarkIcon />
    };
    return icons[type] || <AssignmentIcon />;
};

const SubmissionHistory = () => {
    const tasks = useSelector((state) => state.taskSlice?.tasks || []);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const isPastDue = (finalDate) => new Date(finalDate) < new Date();

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ fontSize: '1.25rem', textAlign: 'center' }}>היסטוריית מטלות</DialogTitle>
            <DialogContent dividers>
                {tasks.length === 0 && (
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>אין מטלות להצגה.</Typography>
                )}

                {tasks.map((task) => {
                    if (!task || !task.id) {
                        console.error("Task or task ID is undefined:", task);
                        return null;
                    }

                    const overdue = isPastDue(task.finalDate);
                    const taskSubmitted = task.isSubmitted;

                    return (
                        <Box key={task.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }} dir="rtl">
                            <Stack direction="row" spacing={1} alignItems="center">
                                {getTaskTypeIcon(task.type)}
                                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '0.875rem' }}>{task.name}</Typography>
                                <Chip
                                    label={getTaskTypeHebrew(task.type)}
                                    color={getTaskTypeColor(task.type)}
                                    size="small"
                                />
                            </Stack>

                            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>קורס:</strong> {task.course}</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>שיעור:</strong> {task.lessonId}</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>תיאור:</strong> {task.desc}</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>תאריך:</strong> {task.finalDate}</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}><strong>קובץ:</strong> {task.instructionsFile}</Typography>
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
                <Button onClick={handleClose} sx={{ fontSize: '0.75rem' }}>סגור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SubmissionHistory;