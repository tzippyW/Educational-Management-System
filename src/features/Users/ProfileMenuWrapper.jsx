import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Menu, MenuItem } from '@mui/material';
import ProfilePage from './ProfilePage';
import UserActivityPage from './userActivity/UserActivityPage';
import ActivityChart from './userActivity/ActivityChart';
const ProfileMenuWrapper = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  if (!currentUser) {
    return <p>יש להתחבר למערכת</p>;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (page) => {
    setAnchorEl(null);
    setSelectedPage(page);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button variant="contained" onClick={handleClick}>
        פרופיל
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(null)}>
        <MenuItem onClick={() => handleClose('profile')}>צפייה בפרטים אישיים</MenuItem>
        <MenuItem onClick={() => handleClose('activity')}>היסטוריית פעילות</MenuItem>
      </Menu>

      <div style={{ marginTop: '20px' }}>
        {selectedPage === 'profile' && <ProfilePage />}
        {selectedPage === 'activity' && <UserActivityPage />}
        {selectedPage === 'activity' && <ActivityChart />}

      </div>
    </div>
  );
};

export default ProfileMenuWrapper;
