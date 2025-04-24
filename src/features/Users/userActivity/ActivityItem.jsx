// src/components/ActivityItem.jsx
import React from 'react';

const ActivityItem = ({ activity }) => {
  const date = new Date(activity.date).toLocaleString('he-IL');
  return (
    <div style={{ borderBottom: '1px solid gray', padding: '10px' }}>
      <p><strong>סוג:</strong> {activity.type}</p>
      <p><strong>תאריך:</strong> {date}</p>
      <p>
        <strong>קישור:</strong> 
        <a href={activity.url} target="_blank" rel="noopener noreferrer">
          {activity.url}
        </a>
      </p>
    </div>
  );
};

export default ActivityItem;
