import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, updateUserPassword } from '../usersSlice';  // שים לב לשינוי כאן
import { Paper, Typography, TextField, Button, Alert } from '@mui/material';

const ForgotPassword = ({ onBackToLogin }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleReset = () => {
    const user = users.find(u => u.email === email);
    if (user) {
      const newPassword = Math.random().toString(36).slice(-8); // סיסמה רנדומלית
      dispatch(updateUserPassword({ email, newPassword }));  // השתמש ב-`updateUserPassword` במקום `updateUser`
      setMessage(`סיסמה חדשה נשלחה לכתובת ${email}: ${newPassword}`);
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
