
import React from 'react';
import { Card, CardContent, Typography, IconButton, Checkbox, Stack } from '@mui/material';
import { Edit, Delete, Star, StarBorder, CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { toggleCompleted, toggleImportant, deleteTask } from './tasksSlice';

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleToggleCompleted = () => {
    dispatch(toggleCompleted({ id: task.id }));
  };

  const handleToggleImportant = () => {
    dispatch(toggleImportant({ id: task.id }));
  };

  const handleDelete = () => {
    dispatch(deleteTask({ id: task.id }));
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
        transition: 'transform 0.1s',
        '&:hover': { transform: 'scale(1.02)' },
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          
          {/* אזור הטקסט, תאריך והצ׳קבוקס */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Checkbox
              checked={task.isCompleted}
              onChange={handleToggleCompleted}
              icon={<CheckCircleOutline />}
              checkedIcon={<CheckCircle />}
            />
            <Typography
              variant="body1"
              sx={{
                textDecoration: task.isCompleted ? 'line-through' : 'none',
                color: task.isCompleted ? 'text.disabled' : 'text.primary',
                fontWeight: task.isImportant ? 'bold' : 'normal',
              }}
            >
              {task.text}
            </Typography>
            {task.dueDate && (
              <Typography variant="caption" color="text.secondary">
                {new Date(task.dueDate).toLocaleDateString('he-IL')}
              </Typography>
            )}
          </Stack>

          {/* אזור הכפתורים */}
          <Stack direction="row" spacing={1}>
            <IconButton onClick={handleToggleImportant}>
              {task.isImportant 
                ? <Star color="warning" fontSize="small" /> 
                : <StarBorder fontSize="small" />
              }
            </IconButton>

            <IconButton onClick={handleEdit} color="info">
              <Edit fontSize="small" />
            </IconButton>

            <IconButton onClick={handleDelete} color="error">
              <Delete fontSize="small" />
            </IconButton>
          </Stack>

        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskItem;



