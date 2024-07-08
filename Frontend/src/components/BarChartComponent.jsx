import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('June');
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/barchart?month=${selectedMonth}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const formattedData = data.map(item => ({
    name: `${item.min}-${item.max || 'above'}`,
    count: item.count,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bar Chart Stats - {selectedMonth} </h2>
      <div className="mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded"
        >
          {months.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#00c2cc" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
