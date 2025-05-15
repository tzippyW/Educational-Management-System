import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useSelector } from 'react-redux';
import { format, subDays, isAfter } from 'date-fns';

const ActivityChart = () => {
  // שלפנו את הפעילויות ממקום נכון
  const activities = useSelector((state) => state.userActivity.activities) || [];

  const oneWeekAgo = subDays(new Date(), 7);

  // מסנן רק פעילויות מהשבוע האחרון
  const recentActivities = activities.filter((activity) => {
    const date = new Date(activity.date);
    return isAfter(date, oneWeekAgo);
  });

  if (recentActivities.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '1rem' }}>אין פעילויות בשבוע האחרון</div>;
  }

  // סופר כמה פעילויות היו בכל יום
  const dataMap = {};
  recentActivities.forEach((activity) => {
    const date = new Date(activity.date);
    const formatted = format(date, 'yyyy-MM-dd');
    dataMap[formatted] = (dataMap[formatted] || 0) + 1;
  });

  const data = Object.entries(dataMap).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(str) => format(new Date(str), 'dd/MM')} />
        <YAxis allowDecimals={false} />
        <Tooltip
          labelFormatter={(label) => `תאריך: ${format(new Date(label), 'dd/MM/yyyy')}`}
          formatter={(value) => [`${value} פעילויות`, 'מספר']}
        />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;
