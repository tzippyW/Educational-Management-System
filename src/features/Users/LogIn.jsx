import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { selectUsers, setCurrentUser } from './usersSlice'; 
import { Paper, Typography, Button, Grid, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { addActivity } from './userActivity/userActivitySlice';


const LogIn = () => {
    const dispatch = useDispatch(); 
    const usersList = useSelector(selectUsers);
    const [signIn, setSignIn] = useState({ name: '', email: '', password: '' });
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignIn({ ...signIn, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const foundUser = usersList.find(user =>
            user.email === signIn.email && user.password === signIn.password
        );
        if (foundUser) {
            dispatch(setCurrentUser(foundUser)); // ✨ שמירת המשתמש הנוכחי
            dispatch(addActivity({
                id: Date.now(), // או כל מזהה ייחודי
                userId: foundUser.id,
                type: 'התחברות',
                url: window.location.href,
                date: new Date().toISOString()
              }));              
            alert('התחברת בהצלחה!');
            // navigate('/'); // נניח שאת רוצה לחזור לדף הבית או למערכת
        } else {
            alert('משתמש לא נמצא או סיסמה שגויה');
        }
    };

    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h6" gutterBottom>התחברות</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsActive(true)}
                >
                    התחברות
                </Button>
                {isActive && (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="שם משתמש" name="name" value={signIn.name} onChange={handleChange} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="אימייל" name="email" value={signIn.email} onChange={handleChange} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="סיסמא" name="password" value={signIn.password} onChange={handleChange} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                >
                                    להתחברות ומעבר לאתר
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Paper>
        </div>
    );
};

export default LogIn;
