import React from 'react';
import { TextField, Box } from '@mui/material';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <TextField
        label="חיפוש לפי רשימה או פריט"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: 400 }}
      />
    </Box>
  );
};

export default Search;
