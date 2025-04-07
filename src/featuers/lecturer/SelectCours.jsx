import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, MenuItem, FormControl, Select, InputLabel, Box } from '@mui/material';

export const SelectCours = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const navigate = useNavigate();
    
    const courses = [
        { id: 1, name: 'מבוא למדעי המחשב' },
        { id: 2, name: 'אלגוריתמים' },
        { id: 3, name: 'תכנות מתקדם' },
    ];

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    const handleCourseClick = () => {
        navigate(`/TaskList/${selectedCourse}`);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ minWidth: 350, padding: 3, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        בחירת קורס
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="course-select-label">בחר קורס</InputLabel>
                        <Select
                            labelId="course-select-label"
                            value={selectedCourse}
                            onChange={handleCourseChange}
                        >
                            {courses.map((course) => (
                                <MenuItem key={course.id} value={course.name}>
                                    {course.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {selectedCourse && (
                        <Box mt={3} textAlign="center">
                            <Button variant="contained" color="primary" onClick={handleCourseClick}>
                                מעבר למטלות עבור {selectedCourse}
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};
