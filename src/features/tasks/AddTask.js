import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './tasksSlice';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Box
} from '@mui/material';

const AddTask = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(addTask({ text, dueDate, isImportant }));
    setText('');
    setDueDate('');
    setIsImportant(false);
  };

  return (
    <Box component="form" sx={{ width: '100%' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
      >
        {/* שדה טקסט גמיש */}
        <TextField
          label="משימה"
          value={text}
          onChange={e => setText(e.target.value)}
          fullWidth
        />

        {/* שדה תאריך צופה רוחב גדול יותר */}
        <TextField
          type="date"
          label="תאריך יעד"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          sx={{
            minWidth: 180,   // כאן הגדלנו את הרוחב המינימלי
            '& .MuiInputBase-input': {
              textAlign: 'right' // כך שהטקסט יהיה מיושר לימין (עברית)
            }
          }}
        />

        {/* צ'קבוקס לסימון חשיבות */}
        <FormControlLabel
          control={
            <Checkbox
              checked={isImportant}
              onChange={e => setIsImportant(e.target.checked)}
            />
          }
          label="חשובה"
        />

        {/* כפתור הוספה */}
        <Button variant="contained" onClick={handleAdd}>
          הוסף
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTask;


