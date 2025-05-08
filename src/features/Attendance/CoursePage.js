import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

export default function CoursePage() {
  const [courseId, setCourseId] = useState('');
  const course = useSelector((state) =>
    state.attendance.courses.find((c) => c.id === courseId)
  );

  return (
    <Box sx={{ padding: '20px', direction: 'rtl', maxWidth: '1000px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        צפייה בנוכחות לפי קורס
      </Typography>
      
      <TextField
        label="הכנס קוד קורס (למשל: c1)"
        variant="outlined"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        fullWidth
        style={{ marginBottom: '15px', maxWidth: '300px', margin: '0 auto' }}
      />

      {course ? (
        <>
          <Typography variant="h5" align="center" gutterBottom>
            קורס: {course.name}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            מרצה: {course.teacher}
          </Typography>

          <TableContainer component={Paper} style={{ marginTop: '20px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: '20%' }}>תלמידה</TableCell>
                  {course.sessions.map((date) => (
                    <TableCell key={date} align="center" style={{ width: `${80 / course.sessions.length}%` }}>
                      {date}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {course.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    {course.sessions.map((date) => (
                      <TableCell key={date} style={{ textAlign: 'center' }}>
                        {student.attendance[date] ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Cancel color="error" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        courseId && <Typography color="error" align="center">לא נמצא קורס עם הקוד הזה.</Typography>
      )}
    </Box>
  );
}
