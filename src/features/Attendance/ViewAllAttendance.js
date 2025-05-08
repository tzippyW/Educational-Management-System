import React from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from '@mui/material';

export default function CourseList() {
  const courses = useSelector((state) => state.attendance.courses);

  return (
    <Container maxWidth="md" sx={{ mt: 5, direction: 'rtl' }}>
      {/* כותרת ממורכזת */}
      <Typography variant="h4" align="center" gutterBottom>
        רשימת הקורסים
      </Typography>

      {/* טבלה ממורכזת עם מספרים באמצע */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">שם קורס</TableCell>
              <TableCell align="center">מספר מפגשים</TableCell> {/* שינוי כאן */}
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell align="right">{course.name}</TableCell>
                <TableCell align="center">{course.sessions.length}</TableCell> {/* שינוי כאן */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

