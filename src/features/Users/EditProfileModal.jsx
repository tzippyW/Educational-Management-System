import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './usersSlice';

const EditProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
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
    if (
      name === currentUser.name &&
      email === currentUser.email &&
      password === currentUser.password
    ) {
      alert('לא היו שינויים בפרטים.');
      return;
    }

    const updatedUser = {
      ...currentUser,
      name,
      email,
      password,
    };

    dispatch(setCurrentUser(updatedUser));
    alert('הפרטים עודכנו בהצלחה!');
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '2em',
      background: '#f9f9f9',
      maxWidth: '500px',
      margin: '5vh auto',
      borderRadius: '12px',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5em' }}>עריכת פרטי משתמש</h2>

      <div style={{ marginBottom: '1em' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5em' }}>
          שם:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1em'
          }}
        />
      </div>

      <div style={{ marginBottom: '1em' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5em' }}>
          אימייל:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1em'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5em' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5em' }}>
          סיסמה חדשה:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1em'
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleSave} style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1em',
        }}>
          שמור
        </button>
        <button onClick={onClose} style={{
          backgroundColor: '#dc3545',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1em',
        }}>
          ביטול
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
