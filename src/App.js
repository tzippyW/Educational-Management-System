

// import { useState } from 'react'; 
// import TaskList from './featuers/lecturer/TaskList';
// import { SelectCours } from './featuers/lecturer/SelectCours';
// import EditProfileModal from './features/Users/EditProfileModal';
// import LogIn from './features/Users/LogIn';
// import ProfilePage from './features/Users/ProfilePage';
// import ActivityChart from './features/Users/userActivity/ActivityChart';
// import UserActivityPage from './features/Users/userActivity/UserActivityPage';
// import { useSelector } from 'react-redux';
// import InactiveUsersCards from './features/Users/InactiveUsersCards';
// import ProfileMenuWrapper from './features/Users/ProfileMenuWrapper';

// function App() {
//   const currentUser = useSelector((state) => state.users.currentUser);
//   const [showInactiveUsers, setShowInactiveUsers] = useState(false);

//   return (
//     <div className="App">
//       <h1>Maalot 360</h1>
//       <TaskList />
//       <SelectCours />
//       {!currentUser ? (
//         <LogIn />
//       ) : (
//         <>
//               {currentUser ? <ProfileMenuWrapper /> : <LogIn />}

//           <button onClick={() => setShowInactiveUsers(!showInactiveUsers)}>
//             {showInactiveUsers ? 'חזרה לפרופיל' : 'הצג משתמשים לא פעילים'}
//           </button>

//           {showInactiveUsers ? (
//             <InactiveUsersCards />
//           ) : (
//             <>
//               <button onClick={() => console.log("היסטוריית פעילות")}>
//                 היסטוריית פעילות
//               </button>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
import { useState } from 'react'; 
import TaskList from './featuers/lecturer/TaskList';
import { SelectCours } from './featuers/lecturer/SelectCours';
import EditProfileModal from './features/Users/EditProfileModal';
import LogIn from './features/Users/LogIn';
import ProfilePage from './features/Users/ProfilePage';
import ActivityChart from './features/Users/userActivity/ActivityChart';
import UserActivityPage from './features/Users/userActivity/UserActivityPage';
import { useSelector } from 'react-redux';
import InactiveUsersCards from './features/Users/InactiveUsersCards';
import ProfileMenuWrapper from './features/Users/ProfileMenuWrapper';
import { Button } from '@mui/material';

function App() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);

  return (
    <div className="App">
      <h1>Maalot 360</h1>
      <TaskList />
      <SelectCours />
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
            {showInactiveUsers ? 'חזרה לפרופיל' : 'הצג משתמשים לא פעילים'}
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
}

export default App;
