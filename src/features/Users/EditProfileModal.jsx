import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, updateUserInList } from './usersSlice';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Grid, Dialog, DialogActions, DialogContent } from '@mui/material';

const EditProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.currentUser);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setPassword(currentUser.password || '');
    }
  }, [currentUser]);

  const handleSave = () => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, name, email, password };
    dispatch(updateUserInList(updatedUser));
    dispatch(setCurrentUser(null)); // התנתקות
    alert('הפרטים עודכנו. התחבר מחדש עם הפרטים החדשים.');
    navigate('/login'); // חזרה למסך התחברות
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <Paper elevation={3} style={{ padding: '20px', maxWidth: 500, margin: 'auto' }}>
          <Typography variant="h6" gutterBottom>עריכת פרופיל</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose} color="secondary">ביטול</Button>
            <Button
              onClick={handleSave}
              color="primary"
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                padding: '8px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: '#115293',
                  transform: 'scale(1.03)',
                },
              }}
            >
              שמור
            </Button>
          </DialogActions>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
