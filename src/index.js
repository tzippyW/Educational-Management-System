import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SelectCours } from './featuers/lecturer/SelectCours';
import TaskList from './featuers/lecturer/TaskList';
import { AddTask } from './featuers/lecturer/AddTask';
import { AddQuestions } from './featuers/lecturer/AddQuestions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/add-questions/:taskName/course/:courseName" element={<AddQuestions />} />
                    <Route path="/" element={<SelectCours />} />
                    <Route path="/add-task/:courseName" element={<AddTask />} />
                    <Route path="/TaskList/:courseName" element={<TaskList />} />
                    <Route path="*" element={<App />} /> {/* נתיב ברירת מחדל */}
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();