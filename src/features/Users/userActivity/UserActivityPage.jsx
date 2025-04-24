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

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ActivityItem from './ActivityItem';

const UserActivityPage = () => {
  const activities = useSelector(state => state.userActivity.activities);
  const [showActivities, setShowActivities] = useState(false); // ניהול מצב הצגת הפעילויות

  const toggleActivities = () => {
    setShowActivities(prevState => !prevState); // משנה את המצב להצגת הפעילויות
  };

  return (
    <div>
      <button onClick={toggleActivities}>
        {showActivities ? 'הסתר פעילויות' : 'הצג פעילויות'}
      </button>
      
      {showActivities && (
        <div>
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserActivityPage;
