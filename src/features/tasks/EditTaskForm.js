
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from './tasksSlice';
import { TextField, Button, FormControlLabel, Checkbox, Box } from '@mui/material';

const EditTaskForm = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(task.text);
  const [isImportant, setIsImportant] = useState(task.isImportant);

  const handleSave = () => {
    dispatch(updateTask({ id: task.id, updatedTask: { text, isImportant } }));
    onClose();
  };

  return (
    <Box component="form" sx={{ mb: 2 }}>
      <TextField
        label="ערוך משימה"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
        }
        label="חשובה"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
        שמור
      </Button>
      <Button variant="outlined" onClick={onClose}>
        ביטול
      </Button>
    </Box>
  );
};

export default EditTaskForm;