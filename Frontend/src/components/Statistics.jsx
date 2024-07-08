import React, { useState, useEffect } from 'react';
import axios from 'axios';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0
  });

  useEffect(() => {
    fetchStatistics(selectedMonth);
  }, [selectedMonth]);

  const fetchStatistics = async (month) => {
    try {
      const monthIndex = months.indexOf(month) + 1;
      const response = await axios.get(`http://localhost:3000/api/statistics?month=${monthIndex}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Statistics - {selectedMonth}</h1>
      <div className="mb-4">
        <select 
          value={selectedMonth} 
          onChange={handleMonthChange} 
          className="p-2 bg-yellow-300 rounded-md"
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div className="bg-yellow-300 p-4 rounded-lg">
        <p>Total sale: {statistics.totalSaleAmount.toFixed(2)}</p>
        <p>Total sold item: {statistics.totalSoldItems}</p>
        <p>Total not sold item: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;
