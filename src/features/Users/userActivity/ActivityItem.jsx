import React from 'react';

const ActivityItem = ({ activity }) => {
  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
      <p><strong>סוג:</strong> {activity.type}</p>
      <p><strong>כתובת:</strong> {activity.url}</p>
      <p><strong>תאריך:</strong> {activity.date}</p>
    </div>
  );
};

export default ActivityItem;
