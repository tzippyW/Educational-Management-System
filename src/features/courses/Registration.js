import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Alert
} from '@mui/material';

// טופס הרשמה לקורס עם מספר שלבים (Stepper)
// שלב 1: פרטים אישיים (שם, אימייל, טלפון)
// שלב 2: פרטים נוספים (ת.ז., כתובת, עיר, השכלה, הערות)
// שלב 3: סיכום ואישור הפרטים
// כולל וולידציה של השדות החובה
// מציג הודעת הצלחה לאחר שליחת הטופס
// מעביר את המשתמש בחזרה לדף הקורסים לאחר 3 שניות

const Registration = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const courses = useSelector(state => state.courses.courses);
  const course = courses.find(c => c.id === parseInt(courseId));
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    city: '',
    education: '',
    comments: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!course) {
      navigate('/courses');
    }
  }, [course, navigate]);

  const steps = ['פרטים אישיים', 'פרטים נוספים', 'סיכום ואישור'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (activeStep === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'שדה חובה';
      if (!formData.lastName.trim()) newErrors.lastName = 'שדה חובה';
      if (!formData.email.trim()) {
        newErrors.email = 'שדה חובה';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'כתובת אימייל לא תקינה';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'שדה חובה';
      } else if (!/^\d{9,10}$/.test(formData.phone)) {
        newErrors.phone = 'מספר טלפון לא תקין';
      }
    } else if (activeStep === 1) {
      if (!formData.idNumber.trim()) {
        newErrors.idNumber = 'שדה חובה';
      } else if (!/^\d{9}$/.test(formData.idNumber)) {
        newErrors.idNumber = 'מספר זהות לא תקין';
      }
      if (!formData.address.trim()) newErrors.address = 'שדה חובה';
      if (!formData.city.trim()) newErrors.city = 'שדה חובה';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        // Submit the form
        handleSubmit();
      } else {
        setActiveStep(prevStep => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleSubmit = () => {
    // In a real app, this would send the registration data to the server
    console.log('Registration data:', { courseId, ...formData });
    setSubmitted(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/courses');
    }, 3000);
  };

  if (!course) return null;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          הרשמה לקורס: {course.name}
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {submitted ? (
          <Alert severity="success" sx={{ my: 3 }}>
            ההרשמה התקבלה בהצלחה! מועברים לדף הקורסים...
          </Alert>
        ) : (
          <>
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    label="שם פרטי"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    dir="rtl"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    label="שם משפחה"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    dir="rtl"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="אימייל"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    dir="rtl"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    label="טלפון"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    dir="rtl"
                  />
                </Grid>
              </Grid>
            )}
            
            {activeStep === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="idNumber"
                    label="תעודת זהות"
                    fullWidth
                    value={formData.idNumber}
                    onChange={handleChange}
                    error={!!errors.idNumber}
                    helperText={errors.idNumber}
                    dir="rtl"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    label="כתובת"
                    fullWidth
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    dir="rtl"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="city"
                    label="עיר"
                    fullWidth
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    dir="rtl"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="education"
                    label="השכלה"
                    fullWidth
                    value={formData.education}
                    onChange={handleChange}
                    dir="rtl"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="comments"
                    label="הערות"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.comments}
                    onChange={handleChange}
                    dir="rtl"
                  />
                </Grid>
              </Grid>
            )}
            
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  אנא אשר את הפרטים שלך
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        פרטי הקורס:
                      </Typography>
                      <Typography>
                        {course.name} - {course.desc}
                      </Typography>
                      <Typography>
                        תאריך התחלה: {course.startDate}
                      </Typography>
                      <Typography>
                        תאריך סיום: {course.endDate}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        פרטים אישיים:
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography>שם: {formData.firstName} {formData.lastName}</Typography>
                          <Typography>אימייל: {formData.email}</Typography>
                          <Typography>טלפון: {formData.phone}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>ת.ז.: {formData.idNumber}</Typography>
                          <Typography>כתובת: {formData.address}, {formData.city}</Typography>
                          <Typography>השכלה: {formData.education || 'לא צוין'}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                חזרה
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'שלח' : 'הבא'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Registration;
