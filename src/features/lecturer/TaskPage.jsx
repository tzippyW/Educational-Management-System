import React, { useState } from 'react';
import { Grid, Paper, Button, Typography, Divider, Box, Drawer } from '@mui/material';
import TaskCard from './TaskCard'; // מחייב את רכיב המטלה

const TaskPage = ({ tasks }) => {
  const [filter, setFilter] = useState('all'); // all, notSubmitted, inProgress, submitted

  const filterTasks = (filter) => {
    switch (filter) {
      case 'notSubmitted':
        return tasks.filter(task => task.status === 'notSubmitted');
      case 'inProgress':
        return tasks.filter(task => task.status === 'inProgress');
      case 'submitted':
        return tasks.filter(task => task.status === 'submitted');
      default:
        return tasks;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box p={2}>
            <Typography variant="h6">סינון מטלות</Typography>
            <Button variant="contained" onClick={() => setFilter('all')} fullWidth>הכל</Button>
            <Button variant="contained" onClick={() => setFilter('notSubmitted')} fullWidth>לא הוגשו</Button>
            <Button variant="contained" onClick={() => setFilter('inProgress')} fullWidth>הוגשו חלקית</Button>
            <Button variant="contained" onClick={() => setFilter('submitted')} fullWidth>הושלמו</Button>
          </Box>
        </Drawer>
      </Grid>

      <Grid item xs={9}>
        <Box sx={{ padding: 2 }}>
          {filterTasks(filter).map((task) => (
            <Paper key={task.id} sx={{ padding: 2, marginBottom: 2 }}>
              <TaskCard task={task} />
            </Paper>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskPage;
