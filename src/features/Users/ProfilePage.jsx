import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditProfileModal from './EditProfileModal';

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!currentUser) return <p>יש להתחבר מחדש</p>;

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h2>שלום, {currentUser.name}!</h2>
      <p>אימייל: {currentUser.email}</p>
      <p>סיסמה: {currentUser.password}</p>

      <button onClick={() => setIsEditOpen(true)}>ערוך פרופיל</button>

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
