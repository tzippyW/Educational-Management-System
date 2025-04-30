import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, updateUserInList } from './usersSlice';
import { useNavigate } from 'react-router-dom';

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
    <div className="modal">
      <h2>עריכת פרופיל</h2>
      <label>
        שם:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        אימייל:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        סיסמה:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleSave}>שמור</button>
      <button onClick={onClose}>ביטול</button>
    </div>
  );
};

export default EditProfileModal;
