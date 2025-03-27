// TaskCard.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updatedTask } from './taskSlice';
import { Card, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Box } from '@mui/material';
//הצגה הרשימה לפי כרטיס
export const TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    //משתנה שמחליט האם להציג או לו
    const [status, setStatus] = useState("Show");
    const [editedTask, setEditedTask] = useState(task);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    //פונקציות שמופעלות  בעת לחיצה 
    const onSaveChangesClicked = () => {
        setStatus("Show");
        dispatch(updatedTask(editedTask));
    };

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteTask(task.id));
        setOpenDeleteDialog(false);
    };

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false);
    };

    const handleChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    return (
        <Card style={{ width: "350px", margin: "20px" }}> {/* הפחתנו את ה-margin */}
            <CardContent>
                {status === "Edit" ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="שם" name="name" value={editedTask.name} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="תיאור" name="desc" value={editedTask.desc} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="מספר שיעור" name="lessonId" value={editedTask.lessonId} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="תאריך סופי" name="finalDate" value={editedTask.finalDate} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="קובץ הוראות" name="instructionsFile" value={editedTask.instructionsFile} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="סוג" name="type" value={editedTask.type} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={onSaveChangesClicked}>שמור שינויים</Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Box textAlign="right">
                        <Typography variant="h6">{task.name}</Typography>
                        <Typography variant="body2">תיאור: {task.desc}</Typography>
                        <Typography variant="body2">מספר שיעור: {task.lessonId}</Typography>
                        <Typography variant="body2">תאריך סופי: {task.finalDate}</Typography>
                        <Typography variant="body2">קובץ הוראות: {task.instructionsFile}</Typography>
                        <Typography variant="body2">סוג: {task.type}</Typography>
                    </Box>
                )}
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button onClick={() => setStatus(status === "Edit" ? "Show" : "Edit")}>{status === "Edit" ? "ביטול" : "ערוך"}</Button>
                    <Button onClick={handleDeleteClick}>מחק</Button>
                </Box>
            </CardContent>

            <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
                <DialogTitle>מחיקת מטלה</DialogTitle>
                <DialogContent>
                    <DialogContentText>האם אתה בטוח שברצונך למחוק את המטלה?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>לא</Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">כן</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};