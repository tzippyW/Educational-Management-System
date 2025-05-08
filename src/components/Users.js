import React from 'react';
import { useState } from 'react'; 

import LogIn from './features/Users/LogIn';
import { useSelector } from 'react-redux';
import InactiveUsersCards from './features/Users/InactiveUsersCards';
import ProfileMenuWrapper from './features/Users/ProfileMenuWrapper';
import { Button } from '@mui/material';


const Users = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);


  return (
    <div>
      <h1>Users</h1>
      <p>List of users and their details...</p>
      {!currentUser ? (
        <LogIn />
      ) : (
        <>
          {currentUser ? <ProfileMenuWrapper /> : <LogIn />}
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowInactiveUsers(!showInactiveUsers)}
            style={{ margin: '10px 0' }}
          >
            {showInactiveUsers ? ' הסתר משתמשים לא פעילים' : 'הצג משתמשים לא פעילים'}
          </Button>

          {showInactiveUsers ? (
            <InactiveUsersCards />
          ) : (
            <></>  
          )}
        </>
      )}
    </div>
  );
};

export default Users;