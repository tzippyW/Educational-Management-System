import './App.css';
import  TaskList  from './featuers/lecturer/TaskList';
import { SelectCours } from './featuers/lecturer/SelectCours';
import Users from './features/Users/Users';

function App() {

  return (
    <div className="App">
      {/* <h1>Maalot 360</h1> */}
      <h1>Maalot 360</h1>
      <TaskList/>
      <SelectCours />
      <Users/>
      </div>
  );
}

export default App;
