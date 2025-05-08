
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import EditTaskForm from './EditTaskForm';
import { Stack, Typography } from '@mui/material';

const TaskList = ({ filterType }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const [editingTask, setEditingTask] = useState(null);

  const now = new Date();

  const filtered = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'important') return task.isImportant;
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'past') return task.dueDate && new Date(task.dueDate) < now;
    if (filter === 'active') return !task.isCompleted;
    return true;
  });

  return (
    <>
      {filtered.length === 0 && (
        <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
          אין משימות להצגה
        </Typography>
      )}
      <Stack spacing={2}>
        {filtered.map((task) =>
          editingTask && editingTask.id === task.id ? (
            <EditTaskForm key={task.id} task={task} onClose={() => setEditingTask(null)} />
          ) : (
            <TaskItem key={task.id} task={task} onEdit={setEditingTask} />
          )
        )}
      </Stack>
    </>
);
};

export default TaskList;
