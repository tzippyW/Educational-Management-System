

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, updateUserPassword } from '../usersSlice';
import { addActivity } from './userActivitySlice';
import { Paper, Typography, TextField, Button, Alert } from '@mui/material';

const ForgotPassword = ({ onBackToLogin }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleReset = () => {
    const user = users.find(u => u.email === email);

    if (user) {
      const newPassword = Math.random().toString(36).slice(-8);
      dispatch(updateUserPassword({ email, newPassword }));
      setMessage(`סיסמה חדשה נשלחה לכתובת ${email}: ${newPassword}`);

      // 👇 נוסיף היסטוריית פעילות על המשתמש הזה
      dispatch(
        addActivity({
          id: Date.now(),
          userId: user.id, // לא currentUser כי המשתמש לא מחובר
          type: 'שחזור סיסמה',
        url: window.location.pathname,
          date: new Date().toISOString(),
        })
      );
    } else {
      setMessage('האימייל לא קיים במערכת');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>שחזור סיסמה</Typography>
      <TextField
        fullWidth
        label="הכנס כתובת אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleReset}>
        שלח סיסמה חדשה
      </Button>
      <Button style={{ marginTop: '10px' }} onClick={onBackToLogin}>
        חזרה למסך התחברות
      </Button>
      {message && (
        <Alert severity="info" style={{ marginTop: '20px' }}>
          {message}
        </Alert>
      )}
    </Paper>
  );
};

export default ForgotPassword;
