import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskCard } from './TaskCard';
import { Button, Box, Typography } from '@mui/material';

const TaskList = () => {
    const { courseName } = useParams();
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.taskSlice.tasks);

    // סינון המטלות לפי שם הקורס
    const filteredTasks = tasks.filter((task) => task.course === courseName);

    return (
        <Box>
            {/* הצגת כותרת רק אם courseName קיים */}
            {courseName && (
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4">מטלות עבור {courseName}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: '10px 20px', fontSize: '16px' }}
                        onClick={() => navigate(`/add-task/${courseName}`)} // שינוי הנתיב
                    >
                        הוסף מטלה
                    </Button>
                </Box>
            )}

            {/* הצגת רשימת המטלות */}
            <Box display="flex" flexWrap="wrap" gap={2}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => <TaskCard task={task} key={task.id} />)
                ) : (
                    <Typography>אין מטלות זמינות לקורס זה.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default TaskList;
