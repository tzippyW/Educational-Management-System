// import React from 'react';
// import { useSelector } from 'react-redux';
// import ActivityItem from './ActivityItem'; // ודאי שהנתיב נכון לפי מיקום הקובץ שלך

// const UserActivityPage = () => {
//   const activities = useSelector(state => state.userActivity.activities);

//   return (
//     <div>
//       {activities.map((activity) => (
//         <ActivityItem key={activity.id} activity={activity} />
//       ))}
//     </div>
//   );
// };

// export default UserActivityPage;




// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import ActivityItem from './ActivityItem';

// const UserActivityPage = () => {
//   const activities = useSelector(state => state.userActivity.activities);
//   const [showActivities, setShowActivities] = useState(false); // ניהול מצב הצגת הפעילויות

//   const toggleActivities = () => {
//     setShowActivities(prevState => !prevState); // משנה את המצב להצגת הפעילויות
//   };

//   return (
//     <div>
//       <button onClick={toggleActivities}>
//         {showActivities ? 'הסתר פעילויות' : 'הצג פעילויות'}
//       </button>
      
//       {showActivities && (
//         <div>
//           {activities.map((activity) => (
//             <ActivityItem key={activity.id} activity={activity} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserActivityPage;




import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Button, Grid } from '@mui/material';
import ActivityItem from './ActivityItem';

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
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            {activities.map((activity) => (
              <Grid item xs={12} sm={6} key={activity.id}>
                <ActivityItem activity={activity} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </div>
  );
};

export default UserActivityPage;
