import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, setCurrentUser } from '../usersSlice';

const UsersTable = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const toggleStatus = (id) => {
    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, status: !u.status } : u
    );
    const currentUser = updatedUsers.find((u) => u.id === id);
    dispatch(setCurrentUser(currentUser));
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>שם</th>
          <th>אימייל</th>
          <th>סטטוס</th>
          <th>פעולה</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.status ? 'פעיל' : 'לא פעיל'}</td>
            <td>
              <button onClick={() => toggleStatus(u.id)}>
                שנה ל{u.status ? 'לא פעיל' : 'פעיל'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
