// import React from 'react';
// import { Container, Typography } from '@mui/material';
// import AddTask from './features/tasks/AddTask';
// import TaskList from './features/tasks/TaskList';

// const App = () => {
//   return (
//     <Container>
//       <Typography variant="h3" gutterBottom mt={4}>
//         המשימות שלי
//       </Typography>
//       <AddTask />
//       <TaskList />
//     </Container>
//   );
// };

// export default App;
import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import AddTask   from './features/tasks/AddTask';
import FilterBar from './features/tasks/FilterBar';    // <–– כאן
import TaskList  from './features/tasks/TaskList';

export default function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          המשימות שלי
        </Typography>

        <Box sx={{ mb: 3 }}>
          <AddTask />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FilterBar />                             
        </Box>

        <TaskList />
      </Paper>
    </Container>
  );
}

