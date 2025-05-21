import React, { useState } from "react";
import { useSelector } from "react-redux";
import StudentMoreDetails from "./StudentMoreDetails";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

const Student = () => {
  const currentUser = useSelector((state) => state.users.current_user); // שליפה מ־Redux
  const users = useSelector((state) => state.users.users); // שליפת נתוני המשתמשים מה-Redux store

  const [selectedUser, setSelectedUser] = useState(null); // מצב להצגת פרטי משתמש
  const showMoreDetails = (user) => setSelectedUser(user); // פונקציה להצגת פרטים נוספים
  const closeMoreDetails = () => setSelectedUser(null); // סוגר את פרטי המשתמש

  const [showAddUser, setShowAddUser] = useState(false); // מצב להצגת טופס הוספה
  const toggleAddUserForm = () => setShowAddUser(!showAddUser); // פונקציה לפתיחת טופס ההוספה

  const [editUser, setEditUser] = useState(null); // מצב להצגת טופס עריכה
  const showEdit = (user) => setEditUser(user);
  const closeEdit = () => setEditUser(null); // סוגר את פרטי העריכה

  return (
    <div>
      {/* כפתור להוספת משתמש */}
      {currentUser?.role === "manager" && (
        <Button variant="contained" color="primary" onClick={toggleAddUserForm}>
          הוספה
        </Button>
      )}

      <h2>משתמשים</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם פרטי</TableCell>
              <TableCell>שם משפחה</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fname}</TableCell>
                <TableCell>{user.lname}</TableCell>
                <TableCell>
                  {["manager", "student"].includes(currentUser?.role) && (
                    <Button variant="outlined" color="secondary" onClick={() => showEdit(user)}>
                      ערוך
                    </Button>
                  )}
                  {["manager", "student"].includes(currentUser?.role) && (
                    <Button variant="outlined" color="primary" onClick={() => showMoreDetails(user)}>
                      פרטים נוספים
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* הצגת פרטי המשתמש הנבחר */}
      {selectedUser && <StudentMoreDetails selectedUser={selectedUser} onClose={closeMoreDetails} />}

      {/* טופס הוספה בתוך Dialog */}
      <Dialog open={showAddUser} onClose={toggleAddUserForm} maxWidth="sm" fullWidth>
        <DialogTitle>הוספת משתמש חדש</DialogTitle>
        <DialogContent>
          <AddStudent />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAddUserForm} color="primary">סגור</Button>
        </DialogActions>
      </Dialog>

      {/* הצגת טופס עריכה */}
      {editUser && <EditStudent editUser={editUser} onClose={closeEdit} />}
    </div>
  );
};

export default Student;
