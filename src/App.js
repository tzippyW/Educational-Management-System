
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
        </>
      )}
    </div>
  );
}

export default App;

