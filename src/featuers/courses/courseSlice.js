import { createSlice } from "@reduxjs/toolkit"; 
import { nanoid } from '@reduxjs/toolkit';

const initialState = {
    courses: [
      {
        id: 1,
        name: "קורס פיתוח WEB",
        desc: "קורס מקיף לפיתוח אתרים",
        teacherId: 101,
        startDate: "01/03/2024",
        endDate: "30/06/2024",
        numOfHours: 60,
        numOfHoursPerLesson: 3,
        numOfLessons: 20,
        moreInfo: "קורס מקיף המלמד HTML, CSS, JavaScript ו-React",
        sylabus: "web_development_syllabus.pdf",
        img: "images/WEB.webp",
        active: true
      },
      {
        id: 2,
        name: "פיתוח אפליקציות",
        desc: "פיתוח אפליקציות לאנדרואיד ואייפון",
        teacherId: 102,
        startDate: "15/03/2024",
        endDate: "15/07/2024",
        numOfHours: 70,
        numOfHoursPerLesson: 3.5,
        numOfLessons: 20,
        moreInfo: "קורס מעמיק בפיתוח אפליקציות מובייל עם React Native",
        sylabus: "mobile_app_syllabus.pdf",
        img: "images/app.png",
        active: true
      },
      {
        id: 3,
        name: "בסיסי נתונים",
        desc: "עיצוב ופיתוח בסיסי נתונים",
        teacherId: 103,
        startDate: "10/04/2024",
        endDate: "10/08/2024",
        numOfHours: 50,
        numOfHoursPerLesson: 2.5,
        numOfLessons: 20,
        moreInfo: "קורס המלמד SQL, MongoDB ועקרונות עיצוב בסיסי נתונים",
        sylabus: "database_syllabus.pdf",
        img: "images/basis.webp",
        active: false
      },
      {
        id: 3,
        name: "בסיסי נתונים",
        desc: "עיצוב ופיתוח בסיסי נתונים",
        teacherId: 103,
        startDate: "10/04/2024",
        endDate: "10/08/2024",
        numOfHours: 50,
        numOfHoursPerLesson: 2.5,
        numOfLessons: 20,
        moreInfo: "קורס המלמד SQL, MongoDB ועקרונות עיצוב בסיסי נתונים",
        sylabus: "database_syllabus.pdf",
        img: "images/basis.webp",
        active: false
      },
      {
        id: 3,
        name: "בסיסי נתונים",
        desc: "עיצוב ופיתוח בסיסי נתונים",
        teacherId: 103,
        startDate: "10/04/2024",
        endDate: "10/08/2024",
        numOfHours: 50,
        numOfHoursPerLesson: 2.5,
        numOfLessons: 20,
        moreInfo: "קורס המלמד SQL, MongoDB ועקרונות עיצוב בסיסי נתונים",
        sylabus: "database_syllabus.pdf",
        img: "images/basis.webp",
        active: false
      },
      {
        id: 3,
        name: "בסיסי נתונים",
        desc: "עיצוב ופיתוח בסיסי נתונים",
        teacherId: 103,
        startDate: "10/04/2024",
        endDate: "10/08/2024",
        numOfHours: 50,
        numOfHoursPerLesson: 2.5,
        numOfLessons: 20,
        moreInfo: "קורס המלמד SQL, MongoDB ועקרונות עיצוב בסיסי נתונים",
        sylabus: "database_syllabus.pdf",
        img: "images/basis.webp",
        active: false
      },
      {
        id: 3,
        name: "בסיסי נתונים",
        desc: "עיצוב ופיתוח בסיסי נתונים",
        teacherId: 103,
        startDate: "10/04/2024",
        endDate: "10/08/2024",
        numOfHours: 50,
        numOfHoursPerLesson: 2.5,
        numOfLessons: 20,
        moreInfo: "קורס המלמד SQL, MongoDB ועקרונות עיצוב בסיסי נתונים",
        sylabus: "database_syllabus.pdf",
        img: "images/basis.webp",
        active: false
      },
    ],
//משתנים שמכילים מידע על הקורסים והמצב של הקורסים
    selectedCourse: null, //קורס נבחר
    filteredCourses: [], //קורסים מסוננים
    status: "idle", //מצב הטעינה
    error: null, //שגיאה אם יש
  };

const coursesSlice=createSlice({
    name:"courseSlice",
    initialState,
    reducers:{
      addCourse: (state, action) => {
        const newCourse = {
          id: nanoid(), // יצירת ID ייחודי
          ...action.payload,
          active: true
        };
        console.log('Adding course:', newCourse); // לוג לבדיקה
        state.courses.push(newCourse);
      },
          updateCourse: (state, action) => {
            const index = state.courses.findIndex(course => course.id === action.payload.id);
            if (index !== -1) {
                console.log('Updating course:', action.payload); // לוג לבדיקה
                state.courses[index] = { ...state.courses[index], ...action.payload };
            }
          },
          deleteCourse: (state, action) => {
            //מחיקת קורס
            state.courses = state.courses.filter(course => course.id !== action.payload);
          },
          toggleCourseActive: (state, action) => {
            //הפעלה או השבתה של קורס
            const index = state.courses.findIndex(course => course.id === action.payload);
            if (index !== -1) {
              state.courses[index].active = !state.courses[index].active;
            }
          },
          selectCourse: (state, action) => {
            //בחירת קורס לצפייה
            state.selectedCourse = state.courses.find(course => course.id === action.payload) || null;
          },
          clearSelectedCourse: (state) => {
            //ניקוי הקורס הנבחר
            state.selectedCourse = null;
          },
          filterCourses: (state, action) => {
            //סינון קורסים לפי פעילים/לא פעילים
            const showActive = action.payload;
            if (showActive === 'all') {
              state.filteredCourses = state.courses;
            } else {
              const isActive = showActive === 'active';
              state.filteredCourses = state.courses.filter(course => course.active === isActive);
            }
          },
          filterCoursesByTeacher: (state, action) => {
            //סינון קורסים לפי מורה
            const teacherId = action.payload;
            state.filteredCourses = state.courses.filter(course => course.teacherId === teacherId);
          },
          resetFilters: (state) => {
            //איפוס כל הסינונים
            state.filteredCourses = state.courses;
          }
    },
});
export const { 
    addCourse, 
    updateCourse, 
    deleteCourse, 
    toggleCourseActive, 
    selectCourse, 
    clearSelectedCourse, 
    filterCourses,
    filterCoursesByTeacher,
    resetFilters
  } = coursesSlice.actions;
  
  export default coursesSlice.reducer;