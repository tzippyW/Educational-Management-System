

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Courses from './components/Courses';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Events from './components/Events';
import Tasks from './components/Tasks';
import Attendance from './components/Attendance';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Users from './components/Users';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;

