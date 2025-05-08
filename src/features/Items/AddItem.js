import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './ListSlice';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from '@mui/material';

const AddItem = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ListName: '', itemName: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.ListName.trim() && formData.itemName.trim()) {
      dispatch(addItem(formData)); // ✅ פעולה נכונה מהסלייס
      setFormData({ ListName: '', itemName: '' });
    } else {
      alert('אנא מלאי את כל השדות!');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="10vh"
      bgcolor="#f1f1f1"
    >
      <Paper
        elevation={4}
        sx={{
          width: 175,  // הקטנתי את הרוחב בחצי
          p: 2,        // הקטנתי את ה-padding בחצי
          textAlign: 'right',
          borderRadius: 3,
          bgcolor: '#fafafa',
        }}
      >
        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          הוספת פריט
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="שם הרשימה"
              name="ListName"
              value={formData.ListName}
              onChange={handleChange}
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: '#ffffff',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '5px',
                },
              }}
            />
            <TextField
              label="שם הפריט"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: '#ffffff',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '5px',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: '5px',   // הקטנתי את רדיוס הפינות בכפתור
                height: '35px',        // הקטנתי את הגובה
                fontSize: '12px',      // הקטנתי את גודל הפונט
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              הוספה
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AddItem;
