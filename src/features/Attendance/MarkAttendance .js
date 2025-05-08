import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { setCourses } from './attendanceSlice'; // שים לב לייבוא של פונקציית ה-setCourses

export default function MarkAttendance() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.attendance.courses);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState({});

  const handleAttendanceChange = (studentId, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSaveAttendance = () => {
    // שמירה (למשל, עדכון ב-Redux או שליחה לשרת)
    console.log('Attendance saved:', attendance);
    alert('הנוכחות נשמרה!');
  };

  const selectedCourse = courses.find((course) => course.id === selectedCourseId);

  return (
    <Box sx={{ padding: 4, direction: 'rtl', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        ניהול נוכחות
      </Typography>

      <FormControl sx={{ m: 2, minWidth: 200 }}>
        <InputLabel>בחר קורס</InputLabel>
        <Select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name} ({course.id})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCourse && (
        <>
          <FormControl sx={{ m: 2, minWidth: 200 }}>
            <InputLabel>בחר תאריך</InputLabel>
            <Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {selectedCourse.sessions.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Paper sx={{ marginTop: 4, overflowX: 'auto' }}>
            <Typography variant="h6" sx={{ padding: 2 }}>
              נוכחות לקורס {selectedCourse.name} בתאריך {selectedDate}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">תלמיד</TableCell>
                  <TableCell align="center">נוכחות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCourse.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell align="center">{student.name}</TableCell>
                    <TableCell align="center">
                      <Select
                        value={attendance[student.id] || ''}
                        onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                      >
                        <MenuItem value={true}>נוכח</MenuItem>
                        <MenuItem value={false}>לא נוכח</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleSaveAttendance}
          >
            שמור נוכחות
          </Button>
        </>
      )}
    </Box>
  );
}
