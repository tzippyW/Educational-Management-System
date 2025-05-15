import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Typography, Box, Grid, TextField, InputAdornment, Paper, Button, Dialog, DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { he } from 'date-fns/locale';
import { format } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import {
  addCourse,
  updateCourse,
  deleteCourse,
  toggleCourseActive
} from './courseSlice';

// קומפוננטת ניהול קורסים למנהלים
const AdminCourseManagement = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  // מצבים (states) לניהול הממשק
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    teacherId: '',
    startDate: null,
    endDate: null,
    numOfHours: '',
    numOfHoursPerLesson: '',
    numOfLessons: '',
    moreInfo: '',
    sylabus: '',
    img: '',
    active: true
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({ open: false, courseId: null });

  // מצבים חדשים לקבצים
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    setSearchTerm(''); // איפוס חיפוש
  }, [courses]); // רנדר מחדש כאשר הקורסים משתנים

  useEffect(() => {
    console.log('Courses updated:', courses);
  }, [courses]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true :
      (statusFilter === 'active' ? course.active : !course.active);

    return matchesSearch && matchesStatus;
  });

  console.log('Courses:', courses);
  console.log('Filtered Courses:', filteredCourses);

  // פתיחת דיאלוג להוספת קורס חדש
  const handleAddCourse = () => {
    setEditingCourse(null);
    setFormData({
      name: '',
      desc: '',
      teacherId: '',
      startDate: null,
      endDate: null,
      numOfHours: '',
      numOfHoursPerLesson: '',
      numOfLessons: '',
      moreInfo: '',
      sylabus: '',
      img: '',
      active: true
    });
    setSelectedImage(null);
    setSelectedSyllabus(null);
    setImagePreview('');
    setErrors({});
    setOpenDialog(true);
  };

  // פתיחת דיאלוג לעריכת קורס קיים
  const handleEditCourse = (course) => {
    setEditingCourse(course);

    // המרת תאריכים למבנה Date אם הם קיימים
    let startDate = null;
    let endDate = null;

    if (course.startDate) {
      const [day, month, year] = course.startDate.split('/');
      startDate = new Date(year, month - 1, day);
    }

    if (course.endDate) {
      const [day, month, year] = course.endDate.split('/');
      endDate = new Date(year, month - 1, day);
    }

    setFormData({
      id: course.id,
      name: course.name,
      desc: course.desc,
      teacherId: course.teacherId,
      startDate: startDate,
      endDate: endDate,
      numOfHours: course.numOfHours,
      numOfHoursPerLesson: course.numOfHoursPerLesson,
      numOfLessons: course.numOfLessons,
      moreInfo: course.moreInfo || '',
      sylabus: course.sylabus || '',
      img: course.img || '',
      active: course.active
    });

    // אם יש תמונה קיימת, הצג אותה בתצוגה מקדימה
    if (course.img && course.img.startsWith('http')) {
      setImagePreview(course.img);
    } else if (course.img) {
      setImagePreview(`/images/${course.img}`);
    } else {
      setImagePreview('');
    }

    setSelectedImage(null);
    setSelectedSyllabus(null);
    setErrors({});
    setOpenDialog(true);
  };

  // טיפול בשינויים בטופס
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // ניקוי שגיאות כאשר השדה נערך
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // טיפול בשינוי תאריך
  const handleDateChange = (name, date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));

    // ניקוי שגיאות כאשר השדה נערך
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // טיפול בהעלאת תמונה
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // יצירת URL לתצוגה מקדימה של התמונה
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // עדכון שם הקובץ בטופס
      setFormData(prev => ({
        ...prev,
        img: file.name
      }));

      // ניקוי שגיאות
      if (errors.img) {
        setErrors(prev => ({ ...prev, img: '' }));
      }
    }
  };

  // טיפול בהעלאת סילבוס
  const handleSyllabusUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedSyllabus(file);

      // עדכון שם הקובץ בטופס
      setFormData(prev => ({
        ...prev,
        sylabus: file.name
      }));

      // ניקוי שגיאות
      if (errors.sylabus) {
        setErrors(prev => ({ ...prev, sylabus: '' }));
      }
    }
  };

  // וולידציה של הטופס
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'שם הקורס הוא שדה חובה';
    if (!formData.desc.trim()) newErrors.desc = 'תיאור הקורס הוא שדה חובה';
    if (!formData.teacherId) newErrors.teacherId = 'מזהה מרצה הוא שדה חובה';
    if (!formData.startDate) newErrors.startDate = 'תאריך התחלה הוא שדה חובה';
    if (!formData.endDate) newErrors.endDate = 'תאריך סיום הוא שדה חובה';
    if (!formData.numOfHours) newErrors.numOfHours = 'מספר שעות הוא שדה חובה';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // שמירת הקורס (הוספה או עדכון)
  const handleSaveCourse = () => {
    if (!validateForm()) return;

    const formattedData = { ...formData };

    // פורמט תאריכים
    if (formData.startDate instanceof Date && !isNaN(formData.startDate)) {
      formattedData.startDate = format(formData.startDate, 'dd/MM/yyyy');
    }
    if (formData.endDate instanceof Date && !isNaN(formData.endDate)) {
      formattedData.endDate = format(formData.endDate, 'dd/MM/yyyy');
    }

    if (editingCourse) {
      // עדכון קורס קיים
      console.log('Updating course:', formattedData);
      dispatch(updateCourse(formattedData));
      setSnackbar({ open: true, message: 'הקורס עודכן בהצלחה', severity: 'success' });
    } else {
      // הוספת קורס חדש
      console.log('Adding course:', formattedData);
      dispatch(addCourse(formattedData));
      setSnackbar({ open: true, message: 'הקורס נוסף בהצלחה', severity: 'success' });
    }

    setOpenDialog(false);
  };

  // פתיחת דיאלוג אישור מחיקה
  const handleDeleteConfirm = (courseId) => {
    setDeleteConfirmDialog({ open: true, courseId });
  };

  // מחיקת קורס
  const handleDeleteCourse = () => {
    dispatch(deleteCourse(deleteConfirmDialog.courseId));
    setDeleteConfirmDialog({ open: false, courseId: null });
    setSnackbar({ open: true, message: 'הקורס נמחק בהצלחה', severity: 'success' });
  };

  // שינוי סטטוס קורס (פעיל/לא פעיל)
  const handleToggleActive = (courseId) => {
    dispatch(toggleCourseActive(courseId));
  };

  // סגירת הסנאקבר
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, my: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            ניהול קורסים
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddCourse}
          >
            הוסף קורס חדש
          </Button>
        </Box>

        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="חיפוש קורסים"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="status-filter-label">סטטוס</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="סטטוס"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">הכל</MenuItem>
              <MenuItem value="active">פעילים</MenuItem>
              <MenuItem value="inactive">לא פעילים</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {filteredCourses.length > 0 ? (
          <Grid container spacing={3}>
            {filteredCourses.map(course => (
              <Grid item xs={12} key={course.id}>
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', sm: 150 }, height: { xs: 140, sm: 'auto' } }}
                    image={course.img || "https://via.placeholder.com/150?text=Course"}
                    alt={course.name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography component="div" variant="h5">
                            {course.name}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" component="div">
                            {course.desc}
                          </Typography>
                        </Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={course.active}
                              onChange={() => handleToggleActive(course.id)}
                              color="primary"
                            />
                          }
                          label={course.active ? "פעיל" : "לא פעיל"}
                        />
                      </Box>

                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Typography variant="body2">
                          <strong>תאריך התחלה:</strong> {course.startDate}
                        </Typography>
                        <Typography variant="body2">
                          <strong>תאריך סיום:</strong> {course.endDate}
                        </Typography>
                        <Typography variant="body2">
                          <strong>מספר שעות:</strong> {course.numOfHours}
                        </Typography>
                        <Typography variant="body2">
                          <strong>מספר שיעורים:</strong> {course.numOfLessons}
                        </Typography>
                      </Box>

                      {course.moreInfo && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>מידע נוסף:</strong> {course.moreInfo}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditCourse(course)}
                      >
                        ערוך
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteConfirm(course.id)}
                      >
                        מחק
                      </Button>
                      {course.sylabus && (
                        <Button
                          size="small"
                          onClick={() => alert(`Opening syllabus: ${course.sylabus}`)}
                        >
                          צפה בסילבוס
                        </Button>
                      )}
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" sx={{ my: 5 }}>
            לא נמצאו קורסים התואמים את החיפוש
          </Typography>
        )}
      </Paper>

      {/* דיאלוג להוספה/עריכה של קורס */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingCourse ? `עריכת קורס: ${editingCourse.name}` : 'הוספת קורס חדש'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="שם הקורס"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="teacherId"
                label="מזהה מרצה"
                fullWidth
                value={formData.teacherId}
                onChange={handleChange}
                error={!!errors.teacherId}
                helperText={errors.teacherId}
                margin="normal"
                type="number"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="desc"
                label="תיאור הקורס"
                fullWidth
                value={formData.desc}
                onChange={handleChange}
                error={!!errors.desc}
                helperText={errors.desc}
                margin="normal"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="startDate"
                label="תאריך התחלה"
                fullWidth
                value={formData.startDate}
                onChange={handleChange}
                error={!!errors.startDate}
                helperText={errors.startDate}
                margin="normal"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="endDate"
                label="תאריך סיום"
                fullWidth
                value={formData.endDate}
                onChange={handleChange}
                error={!!errors.endDate}
                helperText={errors.endDate}
                margin="normal"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="numOfHours"
                label="מספר שעות"
                fullWidth
                value={formData.numOfHours}
                onChange={handleChange}
                error={!!errors.numOfHours}
                helperText={errors.numOfHours}
                margin="normal"
                type="number"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="numOfHoursPerLesson"
                label="מספר שעות בשיעור"
                fullWidth
                value={formData.numOfHoursPerLesson}
                onChange={handleChange}
                error={!!errors.numOfHoursPerLesson}
                helperText={errors.numOfHoursPerLesson}
                margin="normal"
                type="number"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="numOfLessons"
                label="מספר שיעורים"
                fullWidth
                value={formData.numOfLessons}
                onChange={handleChange}
                error={!!errors.numOfLessons}
                helperText={errors.numOfLessons}
                margin="normal"
                type="number"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="moreInfo"
                label="מידע נוסף"
                fullWidth
                value={formData.moreInfo}
                onChange={handleChange}
                error={!!errors.moreInfo}
                helperText={errors.moreInfo}
                margin="normal"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="sylabus"
                label="סילבוס"
                fullWidth
                value={formData.sylabus}
                onChange={handleChange}
                error={!!errors.sylabus}
                helperText={errors.sylabus}
                margin="normal"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="img"
                label="תמונה"
                fullWidth
                value={formData.img}
                onChange={handleChange}
                error={!!errors.img}
                helperText={errors.img}
                margin="normal"
                dir="rtl"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active}
                    onChange={(e) => handleChange(e)}
                    color="primary"
                  />
                }
                label="פעיל"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenDialog(false)}
          >
            בטל
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveCourse}
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג אישור מחיקה */}
      <Dialog
        open={deleteConfirmDialog.open}
        onClose={() => setDeleteConfirmDialog({ open: false, courseId: null })}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          מחיקת קורס
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            האם אתה בטוח שברצונך למחוק את הקורס הזה?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDeleteConfirmDialog({ open: false, courseId: null })}
          >
            בטל
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteCourse}
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>

      {/* סנאקבר */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminCourseManagement;
