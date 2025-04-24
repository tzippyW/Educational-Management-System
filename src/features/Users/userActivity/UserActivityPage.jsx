import React from 'react';
import { useSelector } from 'react-redux';
import ActivityItem from './ActivityItem'; // ודאי שהנתיב נכון לפי מיקום הקובץ שלך

const UserActivityPage = () => {
  const activities = useSelector(state => state.userActivity.activities);

  return (
    <div>
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default UserActivityPage;
