

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addActivity } from './userActivity/userActivitySlice';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardActions,
  Box
} from '@mui/material';

function InactiveUsersCards() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.users || []);
  const inactiveUsers = users.filter((user) => user.status === false);

  const [selectedUser, setSelectedUser] = useState(null);

  if (!users.length) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6">לא נמצאו משתמשים במערכת.</Typography>
      </Box>
    );
  }

  if (selectedUser) {
    // שולחים את הפעילות של הצגת פרופיל
    dispatch(
      addActivity({
        id: Date.now(), // מייצר id ייחודי לכל פעילות
        userId: selectedUser.id,
        type: 'הצגת פרופיל משתמש לא פעיל', // סיווג הפעולה
        url: window.location.href, // כתובת הדף (אפשר גם לעדכן לפי הצורך)
        date: new Date().toISOString(), // תאריך הפעולה
      })
    );

    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Card sx={{ minWidth: 350, padding: 3, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              פרטי משתמש: {selectedUser.name}
            </Typography>
            <Typography variant="body1">מייל: {selectedUser.email}</Typography>
            <Typography variant="body1">
              תאריך פעילות אחרון: {selectedUser.lastActivityDate}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedUser(null)}
            >
              הסתר פרטים
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }

  return (
    <Box mt={4} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" gutterBottom>
        משתמשים לא פעילים
      </Typography>
      {inactiveUsers.length === 0 ? (
        <Typography variant="body1">אין משתמשים לא פעילים</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1000 }}>
          {inactiveUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  padding: 2,
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: '0.3s',
                  '&:hover': { boxShadow: 6 },
                  cursor: 'pointer'
                }}
              >
                <CardContent onClick={() => setSelectedUser(user)}>
                  <Typography variant="h6" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    מייל: {user.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    תאריך פעילות: {user.lastActivityDate}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => setSelectedUser(user)}
                  >
                    הצג פרטים
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default InactiveUsersCards;
