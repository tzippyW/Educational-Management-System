import React, { useState } from "react";
import {Table, TableBody,TableCell, TableContainer,TableHead,TableRow,Paper, Checkbox, Dialog, DialogTitle, DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux"; // ייבוא Redux hooks
import * as XLSX from "xlsx"; // ייבוא ספריית xlsx
import { addRegistration, markAsRead, deleteRegistration } from "./registrationSlice"; // ייבוא הפעולה אם נדרש

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#000000", // צבע שחור לכותרת
  color: "#ffffff", // טקסט לבן
  textAlign: "center",
}));

const StyledTableRow = styled(TableRow)(({ theme, isRead }) => ({
  backgroundColor: isRead ? theme.palette.action.hover : theme.palette.background.default,
  fontWeight: isRead ? "normal" : "bold",
  cursor: "pointer",
}));

const RegistrationTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.registration.registrations); 
  const [filter, setFilter] = useState({ status: "", course: "", sortByDate: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  // פונקציה למחיקת משתמש
  const handleDelete = (id) => {
    dispatch(deleteRegistration(id)); // מחיקת משתמש
  };

  // פונקציה ללחיצה על שורה
  const handleRowClick = (id) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user);
    setIsDialogOpen(true);
    dispatch(markAsRead(id)); // עדכון סטטוס ל"נקרא"
  };

  // פונקציה לסגירת הדיאלוג
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
    setResponse("");
  };

  // פונקציה לשליחת תגובה
  const handleSendResponse = () => {
    console.log(`שליחת תגובה למשתמש: ${selectedUser.fname}`);
    setIsSnackbarOpen(true);
    handleCloseDialog();
  };

  // פונקציה לסגירת Snackbar
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // פונקציה לשינוי הסינון
  const handleFilterChange = (key, value) => {
    setFilter((prevFilter) => ({ ...prevFilter, [key]: value }));
  };

  // פונקציה לייצוא נתונים לקובץ Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users); // יצירת גיליון מהנתונים
    const workbook = XLSX.utils.book_new(); // יצירת חוברת עבודה חדשה
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users"); // הוספת הגיליון לחוברת העבודה
    XLSX.writeFile(workbook, "users.xlsx"); // שמירת הקובץ בשם "users.xlsx"
  };

  // סינון ומיון המשתמשים
  const filteredUsers = users
    .filter((user) => (filter.status ? user.status === filter.status : true))
    .filter((user) => (filter.course ? user.courseName === filter.course : true))
    .sort((a, b) => {
      if (filter.sortByDate === "newest") {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      } else if (filter.sortByDate === "oldest") {
        return new Date(a.dateCreated) - new Date(b.dateCreated);
      }
      return 0;
    });

  return (
    <>
      <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px", marginBottom: "20px" }}>
        <Grid container spacing={2} justifyContent="center">
          {/* סינון ומיון */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel>סינון לפי סטטוס</InputLabel>
              <Select
                value={filter.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <MenuItem value="">הכל</MenuItem>
                <MenuItem value="נקרא">נקרא</MenuItem>
                <MenuItem value="לא נקרא">לא נקרא</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel>סינון לפי קורס</InputLabel>
              <Select
                value={filter.course}
                onChange={(e) => handleFilterChange("course", e.target.value)}
              >
                <MenuItem value="">הכל</MenuItem>
                <MenuItem value="React">React</MenuItem>
                <MenuItem value="Angular">Angular</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="C#">C#</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel>מיון לפי תאריך</InputLabel>
              <Select
                value={filter.sortByDate}
                onChange={(e) => handleFilterChange("sortByDate", e.target.value)}
              >
                <MenuItem value="">ללא מיון</MenuItem>
                <MenuItem value="newest">מהחדש לישן</MenuItem>
                <MenuItem value="oldest">מהישן לחדש</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* טבלה */}
      <TableContainer
        component={Paper}
        sx={{
          margin: "20px auto",
          maxWidth: 1200,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <StyledTableCell>קוד</StyledTableCell>
              <StyledTableCell>שם פרטי</StyledTableCell>
              <StyledTableCell>שם משפחה</StyledTableCell>
              <StyledTableCell>אימייל</StyledTableCell>
              <StyledTableCell>פלאפון</StyledTableCell>
              <StyledTableCell>שם קורס</StyledTableCell>
              <StyledTableCell>הודעה</StyledTableCell>
              <StyledTableCell>תאריך</StyledTableCell>
              <StyledTableCell>נקרא</StyledTableCell>
              <StyledTableCell>פעולות</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <StyledTableRow
                key={user.id}
                isRead={user.status === "נקרא"}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
                onClick={() => handleRowClick(user.id)}
              >
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.fname}</TableCell>
                <TableCell align="center">{user.lname}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.courseName}</TableCell>
                <TableCell align="center">{user.message}</TableCell>
                <TableCell align="center">{user.dateCreated}</TableCell>
                <TableCell align="center">
                  <Checkbox checked={user.status === "נקרא"} readOnly />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#000000", // שחור
                      color: "#ffffff", // טקסט לבן
                      "&:hover": { backgroundColor: "#333333" }, // שחור כהה יותר בהובר
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user.id);
                    }}
                  >
                    מחק
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* כפתור ייצוא לאקסל */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000000", // שחור
            color: "#ffffff", // טקסט לבן
            "&:hover": { backgroundColor: "#333333" }, // שחור כהה יותר בהובר
          }}
          onClick={handleExportToExcel}
        >
          ייצוא לאקסל
        </Button>
      </Box>

      {/* דיאלוג לשליחת תגובה */}
      {selectedUser && (
        <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>פרטי הודעה</DialogTitle>
          <DialogContent>
            <p><strong>שם פרטי:</strong> {selectedUser.fname}</p>
            <p><strong>שם משפחה:</strong> {selectedUser.lname}</p>
            <p><strong>אימייל:</strong> {selectedUser.email}</p>
            <p><strong>פלאפון:</strong> {selectedUser.phone}</p>
            <p><strong>קורס:</strong> {selectedUser.courseName}</p>
            <p><strong>הודעה:</strong> {selectedUser.message}</p>
            <TextField
              fullWidth
              label="תגובה"
              multiline
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              sx={{ marginTop: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", gap: 2, padding: "16px" }}>
            <Button
              sx={{
                backgroundColor: "#000000", // שחור
                color: "#ffffff", // טקסט לבן
                borderRadius: "8px", // עיגוליות
                padding: "8px 16px", // מרווח פנימי
                fontWeight: "bold", // טקסט מודגש
                "&:hover": { backgroundColor: "#333333" }, // שחור כהה יותר בהובר
              }}
              onClick={handleCloseDialog}
            >
              סגור
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000000", // שחור
                color: "#ffffff", // טקסט לבן
                borderRadius: "8px", // עיגוליות
                padding: "8px 16px", // מרווח פנימי
                fontWeight: "bold", // טקסט מודגש
                "&:hover": { backgroundColor: "#333333" }, // שחור כהה יותר בהובר
              }}
              onClick={handleSendResponse}
            >
              שלח תגובה
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          התשובה נשלחה בהצלחה!
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegistrationTable;
