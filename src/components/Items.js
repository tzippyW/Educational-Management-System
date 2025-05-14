import React, { useState } from 'react';
import TableView from '../features/Items/TableView';
import AddItem from '../features/Items/AddItem';
import Search from '../features/Items/Search';

import {
  Box,
  Container,
  Paper,
  Typography
} from '@mui/material';


const Items = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 🟦 סטייט לחיפוש

  return (
    <Container maxWidth="md" sx={{ direction: 'rtl', mt: 4 }}>
      {/* כותרת כללית */}
      <Typography variant="h5" align="center" gutterBottom>
        מערכת ניהול רשימות
      </Typography>

      {/* ריבוע הוספת מרצה מיושר לימין */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <AddItem />
      </Box>

      {/* שורת חיפוש */}
      <Box mb={2}>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>

      {/* טבלת מרצים בתוך כרטיס נייר (Paper) */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <TableView searchTerm={searchTerm} />
      </Paper>
    </Container>
  );
};

export default Items;