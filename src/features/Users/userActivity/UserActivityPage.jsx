
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Paper, Typography, Button, Grid } from '@mui/material';
// import ActivityItem from './ActivityItem';


// const UserActivityPage = () => {
//   const activities = useSelector(state => state.userActivity.activities);
//   const [showActivities, setShowActivities] = useState(false);

//   const toggleActivities = () => {
//     setShowActivities(prevState => !prevState);
//   };

//   return (
//     <div>
//       <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
//         <Typography variant="h6" gutterBottom>היסטוריית פעילויות</Typography>
        
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={toggleActivities}
//         >
//           {showActivities ? 'הסתר פעילויות' : 'הצג פעילויות'}
//         </Button>

//         {showActivities && (
//           <Grid container spacing={2} style={{ marginTop: '20px' }}>
//             {activities.map((activity) => (
//               <Grid item xs={12} sm={6} key={activity.id}>
//                 <ActivityItem activity={activity} />
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Paper>
//     </div>
//   );
// };

// export default UserActivityPage;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

const UserActivityPage = () => {
  const activities = useSelector(state => state.userActivity.activities);
  const [showActivities, setShowActivities] = useState(false);

  const toggleActivities = () => {
    setShowActivities(prevState => !prevState);
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>היסטוריית פעילויות</Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={toggleActivities}
        >
          {showActivities ? 'הסתר פעילויות' : 'הצג פעילויות'}
        </Button>

        {showActivities && (
          <Table style={{ marginTop: '20px' }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>סוג פעולה</strong></TableCell>
                <TableCell><strong>תאריך</strong></TableCell>
                <TableCell><strong>קישור</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{new Date(activity.date).toLocaleString('he-IL')}</TableCell>
                  <TableCell>
                    <a href={activity.url} target="_blank" rel="noopener noreferrer">
                      {activity.url}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </div>
  );
};

export default UserActivityPage;
