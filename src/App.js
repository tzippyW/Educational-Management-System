import './App.css';
// import TaskList from './featuers/lecturer/TaskList';
// import { SelectCours } from './featuers/lecturer/SelectCours';
// import Chatt from './features/Chat/Chatt';
import ChatComponent from './features/Chat/Chatt';

function App() {

  return (
    <div className="App">
      {/* <h1>Maalot 360</h1> */}
     
      <div className="App">
      <ChatComponent />
    </div>

      {/* <h1>Maalot 360</h1> */}
      {/* <Chatt /> */}
      {/* <TaskList />
      <SelectCours /> */}

    </div>
  );
}

export default App;
