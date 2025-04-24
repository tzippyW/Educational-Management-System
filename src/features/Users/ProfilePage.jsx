// import React, { useEffect } from 'react';  // הייבוא של useEffect מ-React
// import { useDispatch, useSelector } from 'react-redux';  // useDispatch ו-useSelector מ-React Redux
// import { addActivity } from './userActivity/userActivitySlice'; 
// import ActivityChart from './userActivity/ActivityChart';  // ייבוא הגרף
// import { formatISO, subDays } from 'date-fns';
// import { selectCurrentUser } from './usersSlice';

// const ProfilePage = ({ currentUser }) => {
//     const dispatch = useDispatch();
//     const user = useSelector(selectCurrentUser);  // השתמש ב-selectCurrentUser

//     useEffect(() => {
//         if (currentUser?.id) {  
//             dispatch(addActivity({
//                 id: Date.now(),
//                 userId: currentUser.id,
//                 type: 'כניסה לפרופיל',
//                 url: window.location.href,
//                 date: new Date().toISOString()
//             }));
//         }
//     }, [currentUser]);
    

//     return (
//         <div>
//             <h1>שלום, {currentUser ? currentUser.name : 'אורח'}</h1>
//             {user && <p>הי, {user.name}!</p>} {/* הצגת שם המשתמש */}
//         </div>
//     );
// };

// export default ProfilePage;

import React, { useState } from 'react';

const ProfilePage = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: currentUser.password, // או כל שדה שיש לך
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("שומרים פרטים...", formData);
    // כאן תשלחי דיספאץ' לעדכון המשתמש
  };

  // return (
    // <form onSubmit={handleSubmit}>
      {/* <label>שם: <input name="name" value={formData.name} onChange={handleChange} /></label> */}
      {/* <label>אימייל: <input name="email" value={formData.email} onChange={handleChange} /></label> */}
      {/* <label>סיסמה: <input name="password" value={formData.password} onChange={handleChange} /></label> */}
      // <button type="submit">שמור</button>
    // </form>
  // );
};

export default ProfilePage;
