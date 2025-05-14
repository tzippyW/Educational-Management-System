// studentSlice.js (שנה את שם הסלייס מ-student ל-user)
import { createSlice } from "@reduxjs/toolkit";


// המצב ההתחלתי של המשתמשים
const initialState = {
  users: [
    {
      id: 256398563,
      fname: "הודיה",
      lname: "לוי",
      address: "ירושלים",
      Email: "hodaya123@gmaill.com",
      phone: "052222222",
      userId: 2,
      isActive: true,
    },
    {
      id: 254136884,
      fname: "יעל",
      lname: "כהן",
      address: "חיפה",
      Email: "hodaya123@gmaill.com",
      phone: "111111111",
      userId: 1,
      isActive: true,
    },
    {
      id: 123456789,
      fname: "שירה",
      lname: "לב",
      address: "נתיבות",
      Email: "hodaya123@gmaill.com",
      phone: "222222222",
      userId: 3,
      isActive: false,
    },
    {
      id: 832165498,
      fname: "רות",
      lname: "פרידמן",
      address: "מעלה עמוס",
      Email: "hodaya123@gmaill.com",
      phone: "3333333333",
      userId: 4,
      isActive: true,
    },
    {
      id: 725896320,
      fname: "יהודית",
      lname: "גולדברג",
      address: "ביתר",
      Email: "hodaya123@gmaill.com",
      phone: "888888888",
      userId: 5,
      isActive: false,
    },
  ],
  current_user:{role:"manager"}
};

// יצירת ה-slice לניהול המשתמשים
const userSlice = createSlice({
  name: "users", // שם ה-slice
  initialState, // המצב ההתחלתי
  reducers: {
    // פעולה להוסיף משתמש חדש (אפשר להוסיף גם עוד פעולות כמו עדכון או מחיקה)
    addUser: (state, action) => {
      const newUser = action.payload;
      state.users.push(newUser);
    },
     // פעולה לעדכון משתמש קיים
  updateUser: (state, action) => {
    const updatedUser = action.payload; // קבלה של המידע החדש
    const index = state.users.findIndex((user) => user.id === updatedUser.id); // חיפוש המשתמש בעזרת ה-ID
    if (index !== -1) {
      // אם המשתמש קיים, מעדכנים אותו
      state.users[index] = updatedUser;
    }
  },
  },
 
});

// יצוא של הפעולות מה-slice (כדי להשתמש בהם ברחבי האפליקציה)
export const { addUser, updateUser } = userSlice.actions;

// יצוא של ה-reducer (כדי להשתמש בו ב-store)
export default userSlice.reducer;
