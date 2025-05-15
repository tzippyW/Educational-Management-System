import React from 'react';
import AdminCourseManagement from "../features/courses/AdminCourseManagement";
import GuestCourseList from "../features/courses/GuestCourseList";
import StudentCourseList from "../features/courses/StudentCourseList";

const Courses = () => {
  return (
    <div>
      <h1>Courses</h1>
    <StudentCourseList />
    <GuestCourseList />
    <AdminCourseManagement />

    </div>
  );
};

export default Courses;