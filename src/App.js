import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Courses from './components/Courses';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Events from './components/Events';
import Tasks from './components/Tasks';
import Attendance from './components/Attendance';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Todos from './components/Todos';
import Items from './components/Items';
import Chat from './features/Chat/Chatt';

//childern of tasks  >>>
import { SelectCours } from './features/lecturer/SelectCours';
import StudentTasks from './features/student/StudentTasks';
import { AddTask } from './features/lecturer/AddTask';
import StudentQuestions from './features/student/StudentQuestions';
import SubmissionHistory from './features/student/SubmissionHistory';
import QuestionsList from './features/lecturer/QuestionsList';
import TaskList from './features/lecturer/TaskList';
import AddQuestions from './features/lecturer/AddQuestions';
//childern of tasks  <<<

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
        <Route path="/tasks" element={<Tasks />} >

          <Route path="add-questions/:taskName/course/:courseName" element={<AddQuestions />} />
          <Route path="task/:taskId/questions-list" element={<QuestionsList />} />
          <Route path="task/:taskId/questions" element={<StudentQuestions />} />
          <Route path="add-task/:courseName" element={<AddTask />} />
          <Route path="TaskList/:courseName" element={<TaskList />} />
          <Route path="student" element={<StudentTasks />} />
          <Route path="StudentTasks" element={<StudentTasks />} />
          <Route path="submission-history" element={<SubmissionHistory />} />
          <Route path="lecturer" element={<SelectCours />} />
          <Route path="*" element={<SelectCours />} />
          <Route path="" element={<SelectCours />} />

        </Route>
        <Route path="/todos" element={<Todos />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/users" element={<Users />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </>
  );
}

export default App;