import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from './CourseCard';
import { useSelector } from 'react-redux';

const StudentCourseList = () => {
  // ייבוא הקורסים מ-Redux store
  const coursesFromStore = useSelector((state) => state.courses.courses);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  
  useEffect(() => {
    // עדכון הקורסים מהסטור כשהקומפוננטה נטענת
    if (coursesFromStore && coursesFromStore.length > 0) {
      setCourses(coursesFromStore.map(course => ({
        id: course.id,
        title: course.name,
        description: course.desc,
        instructor: `מרצה #${course.teacherId}`,
        credits: 3,
        duration: `${course.numOfLessons} שיעורים (${course.numOfHours} שעות)`,
        startDate: course.startDate,
        endDate: course.endDate,
        level: 'בינוני',
        category: 'כללי',
        language: 'עברית',
        moreInfo: course.moreInfo, // הוספת המידע הנוסף
        sylabus: course.sylabus,
        imageUrl: course.img || 'https://via.placeholder.com/300x140',
        status: course.active ? 'active' : 'inactive',
        progress: Math.floor(Math.random() * 100), // לצורך הדגמה
        nextAssignment: 'תרגיל הבא - מועד הגשה: 15/12/2023',
        grade: 'טרם נקבע'
      })));
    } else {
      // נתונים לדוגמה במקרה שאין נתונים בסטור
      setCourses([
        { 
          id: 1, 
          title: 'קורס פיתוח ווב', 
          description: 'קורס מקיף לפיתוח אתרים', 
          instructor: 'מרצה #101',
          credits: 3,
          duration: '20 שיעורים (60 שעות)',
          startDate: '01/03/2024',
          endDate: '30/06/2024',
          level: 'בינוני',
          category: 'פיתוח תוכנה',
          language: 'עברית',
          moreInfo: 'קורס מקיף המלמד HTML, CSS, JavaScript ו-React',
          sylabus: 'web_development_syllabus.pdf',
          imageUrl: 'https://via.placeholder.com/300x140?text=Web+Dev',
          status: 'active',
          progress: 35,
          nextAssignment: 'תרגיל 4 - מועד הגשה: 15/12/2023',
          grade: 'טרם נקבע'
        },
        // קורסים נוספים...
      ]);
    }
    setLoading(false);
  }, [coursesFromStore]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  let filteredCourses = courses.filter(course => 
    (course.title && course.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (course.moreInfo && course.moreInfo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (tabValue === 1) {
    filteredCourses = filteredCourses.filter(course => course.status === 'active');
  } else if (tabValue === 2) {
    filteredCourses = filteredCourses.filter(course => course.status === 'completed');
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        הקורסים שלי
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="כל הקורסים" />
          <Tab label="קורסים פעילים" />
          <Tab label="קורסים שהושלמו" />
        </Tabs>
        
        <TextField
          fullWidth
          label="חיפוש"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />
          }}
          sx={{ maxWidth: 500 }}
        />
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredCourses.length === 0 ? (
            <Typography variant="h6" sx={{ my: 4, textAlign: 'center' }}>
              לא נמצאו קורסים
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredCourses.map(course => (
                <Grid item key={course.id} xs={12} sm={6} md={4}>
                  <CourseCard 
                    course={course} 
                    isStudent={true}
                    onEnroll={() => {
                      alert(`נכנסת לקורס: ${course.title}`);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default StudentCourseList;
