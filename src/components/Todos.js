import React from 'react';
import AddTask from '../features/tasks/AddTask';
import FilterBar from '../features/tasks/FilterBar';
import TaskList from '../features/tasks/TaskList';
import { Container, Paper, Typography, Box } from '@mui/material';

const Tasks = () => {
  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            המשימות שלי
          </Typography>

          <Box sx={{ mb: 3 }}>
            <AddTask />
          </Box>

          <Box sx={{ mb: 2 }}>
            <FilterBar />
          </Box>

          <TaskList />
        </Paper>
      </Container>
    </div>
  );
};

export default Tasks;