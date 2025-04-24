import './App.css';
import  TaskList  from './featuers/lecturer/TaskList';
import { SelectCours } from './featuers/lecturer/SelectCours';
import LogIn from './features/Users/LogIn';

function App() {

  return (
    <div className="App">
      {/* <h1>Maalot 360</h1> */}
      <h1>Maalot 360</h1>
      <TaskList/>
      <SelectCours />
      <LogIn/>
      </div>
  );
}

export default App;
