import './App.css';
import UserActivityPage from './features/Users/userActivity/UserActivityPage';
import  TaskList  from './featuers/lecturer/TaskList';
import { SelectCours } from './featuers/lecturer/SelectCours';
import LogIn from './features/Users/LogIn';
import ProfilePage from './features/Users/ProfilePage';

function App() {

  return (
    <div className="App">
      {/* <h1>Maalot 360</h1> */}
      <h1>Maalot 360</h1>
      <TaskList/>
      <SelectCours />
      <LogIn/>
      <UserActivityPage/>
      <ProfilePage/>
      </div>
  );
}

export default App;
