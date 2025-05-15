import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card, CardContent, CardMedia, Typography, Button, Box,
    Chip, Divider, LinearProgress, Grid, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSelector } from 'react-redux';

const CourseCard = ({ course, isStudent = false, onEnroll }) => {
    const navigate = useNavigate();
    const userType = isStudent ? 'student' : 'guest';

    // const handleSyllabusClick = (e) => {
    //     e.stopPropagation();
    //     // In a real app, this would download or open the syllabus file
    //     alert(`Opening syllabus: ${course.sylabus}`);
    // };

    // const handleCardAction = () => {
    //     if (userType === 'guest') {
    //         navigate(`/register/${course.id}`);
    //     } else if (userType === 'student') {
    //         navigate(`/course-content/${course.id}`);
    //     }
    // };

    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="140"
                image={course.imageUrl || "https://via.placeholder.com/300x140"}
                alt={course.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SchoolIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        מרצה: {course.instructor}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {course.description}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Grid container spacing={1} sx={{ mb: 1.5 }}>
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                                תאריך התחלה: {course.startDate}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                                משך: {course.duration}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}> */}
                    {/* <CategoryIcon fontSize="small" sx={{ mr: 0.5 }} /> */}
                    {/* <Typography variant="body2" color="text.secondary">
                        קטגוריה: {course.category || 'כללי'}
                    </Typography> */}
                {/* </Box> */}

                {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LanguageIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        שפה: {course.language || 'עברית'}
                    </Typography>
                </Box> */}

                {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                    <Chip label={`רמה: ${course.level || 'בינוני'}`} size="small" />
                    <Chip label={`נקודות זכות: ${course.credits || 3}`} size="small" />
                </Box> */}

                {/* מידע נוסף על הקורס */}
                {course.moreInfo && (
                    <Accordion sx={{ mt: 2 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <InfoIcon fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography>מידע נוסף</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2">
                                {course.moreInfo}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )}

                {/* סילבוס הקורס */}
                {course.sylabus && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <DescriptionIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="primary">
                            <a href={`#${course.sylabus}`} target="_blank" rel="noopener noreferrer">
                                צפייה בסילבוס
                            </a>
                        </Typography>
                    </Box>
                )}

                {/* {isStudent && course.status === 'active' && (
                    <>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="body2" gutterBottom>
                            התקדמות בקורס:
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={course.progress || 0}
                            sx={{ height: 10, borderRadius: 5, mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {course.progress || 0}% הושלם
                        </Typography>

                        {course.nextAssignment && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                משימה הבאה: {course.nextAssignment}
                            </Typography>
                        )}
                    </>
                )} */}

                {isStudent && course.status === 'completed' && (
                    <>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="body2" gutterBottom>
                            ציון סופי: {course.grade || 'טרם נקבע'}
                        </Typography>
                    </>
                )}
            </CardContent>
            <Box sx={{ p: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => onEnroll && onEnroll(course.id)}
                >
                    {isStudent ? 'כניסה לקורס' : 'הרשמה לקורס'}
                </Button>
            </Box>
        </Card>
    );
};

export default CourseCard;
