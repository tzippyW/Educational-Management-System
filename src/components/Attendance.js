import React from 'react';
import MarkAttendance from '../features/Attendance/MarkAttendance ';
import ViewAllAttendance from'../features/Attendance/ViewAllAttendance';
import StudentAttendanceByCourse from'../features/Attendance/StudentAttendanceByCourse'



const Attendance = () => {
  return (
    <div>
 
 <MarkAttendance />
      <ViewAllAttendance/>
      <StudentAttendanceByCourse/>

    </div>
  );
};

export default Attendance;