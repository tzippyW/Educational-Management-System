import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from "react-router";

const Tasks = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Tasks</h1>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Maalot 360
          </Typography>
          <Button
            color="inherit"
            // sx={{ fontWeight: location.pathname === '/lecturer' ? 'bold' : 'normal' }}
            onClick={() => navigate('lecturer')}
          >
            מרצה
          </Button>
          <Button
            color="inherit"
            // sx={{ fontWeight: location.pathname === '/student' ? 'bold' : 'normal' }}
            onClick={() => navigate('student')}
          >
            משתלמת
          </Button>
        </Toolbar>
      </AppBar>


      <Outlet />
    </div>
  );
};

export default Tasks;