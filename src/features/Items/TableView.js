import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editItem } from './ListSlice';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Select, MenuItem, Button, Stack
} from '@mui/material';

const TableView = ({ searchTerm }) => {
  const items = useSelector((state) => state.ListSlice.ListItem);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ ListName: '', itemName: '', status: '' });

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditedData({ ListName: item.ListName, itemName: item.itemName, status: item.status });
  };

  const handleSave = () => {
    dispatch(editItem({ id: editingId, ...editedData }));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({ ListName: '', itemName: '', status: '' });
  };

  const filteredItems = items.filter(item =>
    item.ListName.includes(searchTerm) || item.itemName.includes(searchTerm)
  );

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 4, direction: 'rtl' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">שם הרשימה</TableCell>
            <TableCell align="center">שם הפריט</TableCell>
            <TableCell align="center">סטטוס</TableCell>
            <TableCell align="center">פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              {editingId === item.id ? (
                <>
                  <TableCell align="center">
                    <TextField
                      value={editedData.ListName}
                      onChange={(e) => setEditedData({ ...editedData, ListName: e.target.value })}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      value={editedData.itemName}
                      onChange={(e) => setEditedData({ ...editedData, itemName: e.target.value })}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      value={editedData.status}
                      onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
                      size="small"
                    >
                      <MenuItem value="פעיל">פעיל</MenuItem>
                      <MenuItem value="לא פעיל">לא פעיל</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button variant="contained" color="primary" onClick={handleSave}>שמור</Button>
                      <Button variant="outlined" onClick={handleCancel}>ביטול</Button>
                    </Stack>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">{item.ListName}</TableCell>
                  <TableCell align="center">{item.itemName}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" onClick={() => handleEdit(item)}>✏ ערוך</Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
