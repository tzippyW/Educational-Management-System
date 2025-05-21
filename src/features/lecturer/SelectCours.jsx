import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CardContent, 
  Typography, 
  Button, 
  MenuItem, 
  FormControl, 
  Select, 
  InputLabel, 
  Box, 
  Container,
  Paper,
  Grid,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  Chip,
  Zoom,
  Fade,
  Grow,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import FunctionsIcon from '@mui/icons-material/Functions';
import StorageIcon from '@mui/icons-material/Storage';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import MemoryIcon from '@mui/icons-material/Memory';
import CloudIcon from '@mui/icons-material/Cloud';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const SelectCours = () => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [animateList, setAnimateList] = useState(false);
    const navigate = useNavigate();
    
    const courses = [
        { id: 1, name: 'מבוא למדעי המחשב', icon: <CodeIcon />, tasks: 12 },
        { id: 2, name: 'אלגוריתמים', icon: <FunctionsIcon />, tasks: 8 },
        { id: 3, name: 'תכנות מתקדם', icon: <BookIcon />, tasks: 15 },
        { id: 4, name: 'מבני נתונים', icon: <StorageIcon />, tasks: 10 },
        { id: 5, name: 'פיתוח אפליקציות ווב', icon: <LanguageIcon />, tasks: 14 },
        { id: 6, name: 'אבטחת מידע וסייבר', icon: <SecurityIcon />, tasks: 9 },
        { id: 7, name: 'ארכיטקטורת מחשבים', icon: <MemoryIcon />, tasks: 7 },
        { id: 8, name: 'מחשוב ענן', icon: <CloudIcon />, tasks: 11 },
    ];

    useEffect(() => {
        // Trigger animation after component mounts
        setAnimateList(true);
    }, []);

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    const handleCourseClick = () => {
        navigate(`/tasks/TaskList/${selectedCourse}`);
    };

    const selectCourse = (courseName) => {
        setSelectedCourse(courseName);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const getBackgroundPattern = () => {
        return darkMode 
            ? `radial-gradient(#303030 1px, transparent 1px), radial-gradient(#303030 1px, transparent 1px)`
            : `radial-gradient(#d7d7d7 1px, transparent 1px), radial-gradient(#d7d7d7 1px, transparent 1px)`;
    };

    return (
        <Container maxWidth="md" sx={{ 
            py: 3,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundImage: getBackgroundPattern(),
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
            transition: 'background-color 0.3s ease',
            overflow: 'hidden'
        }}>
            <Fade in={true} timeout={800}>
                <Paper 
                    elevation={12} 
                    sx={{ 
                        borderRadius: 6, 
                        overflow: 'hidden',
                        background: darkMode 
                            ? 'linear-gradient(to bottom right, #1a1a2e, #16213e)' 
                            : 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
                        minHeight: '550px',
                        maxHeight: '90vh',
                        width: '100%',
                        maxWidth: '800px',
                        mx: 'auto',
                        position: 'relative',
                        boxShadow: darkMode 
                            ? '0 10px 30px rgba(0, 0, 0, 0.5)' 
                            : '0 10px 30px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        border: darkMode 
                            ? '1px solid rgba(255, 255, 255, 0.1)' 
                            : '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                >
                    {/* Header with decorative elements */}
                    <Box 
                        sx={{ 
                            bgcolor: darkMode ? '#0d1b2a' : 'primary.main', 
                            color: 'white', 
                            p: 3, 
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                                transform: 'rotate(30deg)',
                            }
                        }}
                    >
                        {/* Theme toggle button */}
                        <IconButton 
                            sx={{ 
                                position: 'absolute', 
                                top: 10, 
                                right: 10,
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                }
                            }}
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        
                        {/* Notification button */}
                        <IconButton 
                            sx={{ 
                                position: 'absolute', 
                                top: 10, 
                                left: 10,
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                }
                            }}
                        >
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        
                        <Zoom in={true} timeout={800}>
                            <Avatar sx={{ 
                                bgcolor: darkMode ? 'primary.main' : 'white', 
                                width: 60, 
                                height: 60,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                            }}>
                                <SchoolIcon color={darkMode ? "white" : "primary"} sx={{ fontSize: 35 }} />
                            </Avatar>
                        </Zoom>
                        <Typography 
                            variant="h4" 
                            fontWeight="bold"
                            sx={{
                                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                letterSpacing: '1px'
                            }}
                        >
                            בחירת קורס
                        </Typography>
                    </Box>
                    
                    <CardContent sx={{ 
                        p: 3,
                        color: darkMode ? 'white' : 'inherit',
                        overflowY: 'auto',
                        maxHeight: 'calc(90vh - 120px)'
                    }}>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <Fade in={true} timeout={1000}>
                                    <Typography 
                                        variant="h6" 
                                        align="center" 
                                        gutterBottom
                                        sx={{
                                            color: darkMode ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                                            fontWeight: 500,
                                            mb: 2
                                        }}
                                    >
                                        אנא בחר את הקורס שברצונך לנהל
                                    </Typography>
                                </Fade>
                            </Grid>
                            
                            <Grid item>
                                <Fade in={true} timeout={1200}>
                                    <FormControl 
                                        fullWidth 
                                        variant="outlined" 
                                        sx={{ mb: 3 }}
                                    >
                                        <InputLabel 
                                            id="course-select-label"
                                            sx={{ color: darkMode ? 'rgba(255,255,255,0.7)' : undefined }}
                                        >
                                            בחר קורס
                                        </InputLabel>
                                        <Select
                                            labelId="course-select-label"
                                            value={selectedCourse}
                                            onChange={handleCourseChange}
                                            label="בחר קורס"
                                            sx={{ 
                                                borderRadius: 3,
                                                fontSize: '1.1rem',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'primary.light',
                                                    borderWidth: '2px'
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: darkMode ? 'rgba(255,255,255,0.5)' : 'primary.main',
                                                },
                                                '& .MuiSelect-icon': {
                                                    color: darkMode ? 'rgba(255,255,255,0.7)' : undefined
                                                },
                                                color: darkMode ? 'white' : undefined,
                                                height: '55px'
                                            }}
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        bgcolor: darkMode ? '#1a1a2e' : 'white',
                                                        '& .MuiMenuItem-root': {
                                                            color: darkMode ? 'white' : undefined
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            {courses.map((course) => (
                                                <MenuItem key={course.id} value={course.name}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {course.icon}
                                                        <Typography>{course.name}</Typography>
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Fade>
                            </Grid>
                            
                            <Grid item>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={{ 
                                            fontWeight: 'bold',
                                            color: darkMode ? 'rgba(255,255,255,0.9)' : undefined
                                        }}
                                    >
                                        רשימת הקורסים:
                                    </Typography>
                                    <Tooltip title="לחץ על קורס כדי לבחור אותו">
                                        <IconButton size="small">
                                            <HelpOutlineIcon fontSize="small" color={darkMode ? "white" : "primary"} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                
                                <Box sx={{ 
                                    bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : '#f8f8f8', 
                                    borderRadius: 4, 
                                    py: 1,
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
                                    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : undefined
                                }}>
                                    <List>
                                        {courses.map((course, index) => (
                                            <Grow 
                                                in={animateList} 
                                                timeout={500 + (index * 100)}
                                                key={course.id}
                                            >
                                                <ListItem 
                                                    button 
                                                    onClick={() => selectCourse(course.name)}
                                                    sx={{ 
                                                        borderRadius: 2,
                                                        mx: 1,
                                                        mb: 0.5,
                                                        bgcolor: selectedCourse === course.name 
                                                            ? (darkMode ? 'rgba(66, 133, 244, 0.3)' : 'primary.light') 
                                                            : 'transparent',
                                                        color: selectedCourse === course.name 
                                                            ? (darkMode ? 'white' : 'primary.dark') 
                                                            : (darkMode ? 'rgba(255,255,255,0.8)' : 'inherit'),
                                                        transition: 'all 0.2s',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: 5,
                                                        }
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        {course.icon}
                                                    </ListItemIcon>
                                                    <Typography variant="body2">
                                                        {course.name}
                                                    </Typography>
                                                    <Chip 
                                                        label={`${course.tasks} משימות`} 
                                                        size="small" 
                                                        sx={{
                                                            ml: 1,
                                                            bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : undefined,
                                                            color: darkMode ? 'white' : undefined,
                                                            '& .MuiChip-label': {
                                                                fontSize: '0.8rem'
                                                            }
                                                        }}
                                                    />
                                                </ListItem>
                                            </Grow>
                                        ))}
                                    </List>
                                </Box>
                            </Grid>
                            
                            {selectedCourse && (
                                <>
                                    <Grid item>
                                        <Divider sx={{ 
                                            my: 2,
                                            borderColor: darkMode ? 'rgba(255,255,255,0.1)' : undefined
                                        }} />
                                    </Grid>
                                    <Grid item sx={{ textAlign: 'center', mb: 3 }}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                mb: 2, 
                                                fontWeight: 'bold',
                                                color: darkMode ? 'rgba(255,255,255,0.9)' : 'primary.main'
                                            }}
                                        >
                                            הקורס הנבחר: <Box component="span" sx={{ 
                                                color: darkMode ? 'primary.light' : 'primary.dark',
                                                fontWeight: 'bold'
                                            }}>{selectedCourse}</Box>
                                        </Typography>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={handleCourseClick}
                                            size="large"
                                            endIcon={<ListAltIcon />}
                                            sx={{ 
                                                borderRadius: 2, 
                                                px: 4, 
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                boxShadow: 3,
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 5,
                                                },
                                                transition: 'all 0.2s',
                                                bgcolor: darkMode ? 'primary.main' : undefined,
                                                mb: 2
                                            }}
                                        >
                                            מעבר למטלות
                                        </Button>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </CardContent>
                </Paper>
            </Fade>
        </Container>
    );
}
