// import './App.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCurrentUser, selectCurrentUser } from './features/Users/usersSlice'; // ייבוא האקשנים והסלקטור
// import UserActivityPage from './features/Users/userActivity/UserActivityPage';
// import TaskList from './featuers/lecturer/TaskList';
// import { SelectCours } from './featuers/lecturer/SelectCours';
// import LogIn from './features/Users/LogIn';
// import ProfilePage from './features/Users/ProfilePage';
// import ActivityChart from './features/Users/userActivity/ActivityChart';
// import EditProfileModal from './features/Users/EditProfileModal';

// function App() {
//   const currentUser = useSelector(selectCurrentUser); // שמירה על currentUser מתוך ה־Redux store
//   const dispatch = useDispatch(); // גישה לפונקציות Dispatch של Redux

//   const handleLogin = (user) => {
//     dispatch(setCurrentUser(user)); // פעולה להגדיר את המשתמש המחובר
//   };

//   return (
//     <div className="App">
//       <h1>Maalot 360</h1>
//       <TaskList />
//       <SelectCours />
//       {/* אם המשתמש לא מחובר, מציג את מסך ההתחברות */}
//       {!currentUser ? (
//         <LogIn onLogin={handleLogin} />
//       ) : (
//         <>
//           {/* אם יש משתמש מחובר, מציג את שאר הרכיבים */}
//           <ProfilePage />
//           <ActivityChart />
//           <EditProfileModal user={currentUser} onClose={() => {}} />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import EditProfileModal from './features/Users/EditProfileModal';
import LogIn from './features/Users/LogIn';
import ProfilePage from './features/Users/ProfilePage';
import ActivityChart from './features/Users/userActivity/ActivityChart';
import UserActivityPage from './features/Users/userActivity/UserActivityPage';
import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <div className="App">
      {!currentUser ? (
        <LogIn />
      ) : (
        <>
          <button onClick={() => console.log("היסטוריית פעילות")}>
            היסטוריית פעילות
          </button>
          <ActivityChart userId={currentUser.id} />
          <UserActivityPage userId={currentUser.id} />
          <ProfilePage currentUser={currentUser} />
          <EditProfileModal/>
        </>
      )}
    </div>
  );
}

export default App;

