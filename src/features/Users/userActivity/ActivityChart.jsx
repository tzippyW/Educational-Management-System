import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { parseISO, format } from 'date-fns';

const ActivityChart = () => {
  const activities = useSelector((state) => state.userActivity.activities);

  // הכנה של הנתונים לגרף: כמה פעילויות היו בכל יום
  const dataMap = {};

  activities.forEach((activity) => {
    const date = format(parseISO(activity.date), 'yyyy-MM-dd');
    dataMap[date] = (dataMap[date] || 0) + 1;
  });

  const data = Object.entries(dataMap).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">גרף פעילות לפי תאריך</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;