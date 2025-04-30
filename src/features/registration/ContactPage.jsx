import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRegistration } from './registrationSlice';
import { Box, TextField, Button, Typography, Grid, Alert, Snackbar } from '@mui/material';

export default function ContactPage() {
  
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    courseId: '',
    courseName: '',
    message: '',
    dateCreated: new Date().toISOString().split('T')[0], // תאריך נוכחי
    status: 'לא נקרא',
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRegistration(formData)); // שליחת הנתונים ל-Redux Store
    setIsSnackbarOpen(true); // פתיחת ה-Snackbar
    setFormData({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      courseId: '',
      courseName: '',
      message: '',
      dateCreated: new Date().toISOString().split('T')[0],
      status: 'לא נקרא',
    });
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', 
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          width: '100%',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            textAlign: 'center',
            color: '#000000', // צבע שחור לכותרת
            fontWeight: 'bold',
          }}
        >
          טופס יצירת קשר
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="שם פרטי"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="שם משפחה"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="אימייל"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="טלפון"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="שם קורס"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="קוד קורס"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="הודעה"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              margin="dense"
              multiline
              rows={4}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#000000', // שחור
              color: '#ffffff', // טקסט לבן
              '&:hover': { backgroundColor: '#333333' }, // שחור כהה יותר בהובר
            }}
          >
            שלח
          </Button>
        </Box>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            הטופס נשלח בהצלחה!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
