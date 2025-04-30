import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/teachers">Teachers</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/chat">Chat</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;