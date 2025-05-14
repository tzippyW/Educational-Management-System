import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUser } from "./studentSlice"; // ייבוא הפעולה להוספת משתמש חדש

const AddStudent = () => {
  const dispatch = useDispatch();

  //  יצירת אובייקט ריק למשתמש חדש
  const [newUser, setNewUser] = useState({
    id: "",
    fname: "",
    lname: "",
    address: "",
    Email: "",
    phone: "",
    userId: "",
    isActive: true, // ברירת מחדל: פעיל
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser({
      ...newUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    if (!newUser.id || !newUser.fname || !newUser.lname) {
      alert("אנא מלא את כל השדות החיוניים!");
      return;
    }
    dispatch(addUser(newUser)); // שליחת המשתמש החדש ל-Redux
    alert("משתמש נוסף בהצלחה!");
    setNewUser({ // איפוס הטופס אחרי ההוספה
      id: "",
      fname: "",
      lname: "",
      address: "",
      Email: "",
      phone: "",
      userId: "",
      isActive: true,
    });
  };

  return (
    <div>
      <h2>הוספת משתמש חדש</h2>
      <TextField
        label="תעודת זהות"
        type="number"
        name="id"
        value={newUser.id}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="שם פרטי"
        type="text"
        name="fname"
        value={newUser.fname}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="שם משפחה"
        type="text"
        name="lname"
        value={newUser.lname}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="כתובת"
        name="address"
        value={newUser.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="מייל"
        type="email"
        name="Email"
        value={newUser.Email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="טלפון"
        type="tel"
        name="phone"
        value={newUser.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="קוד משתמש"
        type="number"
        name="userId"
        value={newUser.userId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSave}>
        הוסף משתמש
      </Button>
    </div>
  );
};

export default AddStudent;
