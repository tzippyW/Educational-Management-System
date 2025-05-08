
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addActivity } from './userActivity/userActivitySlice'; // ודא שהייבוא נכון
import EditProfileModal from './EditProfileModal';
import { Button } from '@mui/material';

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();

  if (!currentUser) return <p>יש להתחבר מחדש</p>;

  const handleEditClick = () => {
    setIsEditOpen(true);
    // הוספת הפעילות להיסטוריה
    dispatch(
      addActivity({
        id: Date.now(),
        userId: currentUser.id,
        type: 'עריכת פרופיל',
        url: window.location.href,
        date: new Date().toISOString()
      })
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h2>שלום, {currentUser.name}!</h2>
      <p>אימייל: {currentUser.email}</p>
      <p>סיסמה: {currentUser.password}</p>

      <Button
        onClick={handleEditClick} // השתמש בפונקציה החדשה
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '10px 24px',
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
        ערוך פרופיל
      </Button>

      {/* הטופס יוצג רק כשהמשתמש לוחץ על הכפתור */}
      {isEditOpen && (
        <EditProfileModal 
          user={currentUser}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;

