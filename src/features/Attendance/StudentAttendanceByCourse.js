import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

export default function AttendanceTable() {
  const courses = useSelector((state) => state.attendance.courses);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const selectedCourse = courses.find((course) => course.id === selectedCourseId);
  const selectedStudent = selectedCourse?.students.find((s) => s.id === selectedStudentId);

  const totalSessions = selectedCourse?.sessions.length || 0;
  const attendedCount = selectedStudent
    ? selectedCourse.sessions.filter((date) => selectedStudent.attendance[date]).length
    : 0;

  return (
    <Box sx={{ padding: 4, direction: 'rtl', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        צפייה בנוכחות משתלמת
      </Typography>

      <FormControl sx={{ m: 2, minWidth: 200 }}>
        <InputLabel>בחר קורס</InputLabel>
        <Select
          value={selectedCourseId}
          onChange={(e) => {
            setSelectedCourseId(e.target.value);
            setSelectedStudentId('');
          }}
        >
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name} ({course.id})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCourse && (
        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <InputLabel>בחר משתלמת</InputLabel>
          <Select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            {selectedCourse.students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name} ({student.id})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedStudent && (
        <Paper sx={{ marginTop: 4, overflowX: 'auto' }}>
          <Typography variant="h6" sx={{ padding: 2 }}>
            נוכחות של {selectedStudent.name} בקורס {selectedCourse.name}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">תאריך</TableCell>
                <TableCell align="center">נוכחות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCourse.sessions.map((date) => (
                <TableRow key={date}>
                  <TableCell align="center">{date}</TableCell>
                  <TableCell align="center">
                    {selectedStudent.attendance[date] ? '✔️' : '❌'}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                  סה"כ נוכחות: {attendedCount} מתוך {totalSessions}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}