import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Grid,
    Divider,
    Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import { useParams } from 'react-router-dom';

const getTaskTypeIcon = (type) => {
    switch (type) {
        case 'quiz':
            return <QuizIcon />;
        case 'assignment':
            return <AssignmentIcon />;
        case 'project':
            return <SchoolIcon />;
        case 'exam':
            return <EventIcon />;
        default:
            return <AssignmentIcon />;
    }
};

const getTaskTypeHebrew = (type) => {
    switch (type) {
        case 'quiz':
            return 'בוחן';
        case 'assignment':
            return 'מטלה';
        case 'project':
            return 'פרויקט';
        case 'exam':
            return 'מבחן';
        default:
            return 'מטלה';
    }
};

const getTaskTypeColor = (type) => {
    switch (type) {
        case 'quiz':
            return 'primary';
        case 'assignment':
            return 'success';
        case 'project':
            return 'secondary';
        case 'exam':
            return 'error';
        default:
            return 'primary';
    }
};

const TaskCard = ({ onEdit, onDelete, onNavigateToQuestions }) => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        if (taskId) {
            console.log("Fetching task with ID:", taskId);
            setLoading(true); // Set loading to true before fetching
            // Replace with your actual data fetching logic (API or Redux)
            fetch(`/api/tasks/${taskId}`)
                .then(response => response.json())
                .then(data => {
                    setTask(data);
                    setLoading(false); // Set loading to false after fetching
                })
                .catch(error => {
                    console.error("Error fetching task:", error);
                    setLoading(false); // Set loading to false on error
                });
        }
    }, [taskId]);

    if (loading) {
        return <div>טוען...</div>; // Show loading message while fetching
    }

    if (!task) {
        return <div>מטלה לא נמצאה.</div>; // Show message if task is not found
    }

    return (
        <Card elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 8 }, mb: 3 }}>
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                מספר שיעור:
                            </Typography>
                            <Typography variant="body1">
                                {task.lessonId}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                תאריך סופי:
                            </Typography>
                            <Typography variant="body1">
                                {task.finalDate}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
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
                        onClick={() => onEdit && onEdit(task)}
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
                        onClick={() => onDelete && onDelete(task.id)}
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
                        onClick={() => {
                            if (typeof onNavigateToQuestions === 'function') {
                                onNavigateToQuestions(task);
                            } else {
                                console.error("onNavigateToQuestions is not a function");
                            }
                        }}
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
            </CardActions>
        </Card>
    );
};

export default TaskCard;