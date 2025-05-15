

import React from 'react';
import { Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from './tasksSlice';

export default function FilterBar() {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.tasks.filter);

  // הגדרת כל אפשרויות הסינון
  const filters = [
    { label: 'הכל', value: 'all' },
    { label: 'חשובות', value: 'important' },
    { label: 'עברו תאריך', value: 'past' },
    { label: 'הושלמו', value: 'completed' },
    { label: 'לא הושלמו', value: 'active' },
  ];

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      {filters.map(f => (
        <Button
          key={f.value}
          variant={currentFilter === f.value ? 'contained' : 'outlined'}
          onClick={() => dispatch(setFilter(f.value))}
          color={currentFilter === f.value ? 'primary' : 'default'}
        >
          {f.label}
        </Button>
      ))}
    </Stack>
  );
}
