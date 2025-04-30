import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function InactiveUsersCards() {
  const users = useSelector((state) => state.users.users);
  const inactiveUsers = users.filter((user) => !user.status);

  const [selectedUser, setSelectedUser] = useState(null);

  if (selectedUser) {
    return (
      <div>
        <h2>פרטי משתמש: {selectedUser.name}</h2>
        <p>מייל: {selectedUser.email}</p>
        <p>תאריך פעילות אחרון: {selectedUser.lastActivityDate}</p>
        <button onClick={() => setSelectedUser(null)}>חזרה לרשימה</button>
      </div>
    );
  }

  return (
    <div>
      <h2>משתמשים לא פעילים</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {inactiveUsers.map((user) => (
          <div
            key={user.id}
            style={{
              border: '1px solid gray',
              borderRadius: '8px',
              padding: '1rem',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedUser(user)}
          >
            <h3>{user.name}</h3>
            <p>מייל: {user.email}</p>
            <p>תאריך פעילות: {user.lastActivityDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InactiveUsersCards;
