import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';


const groupByCategory = (transactions) => {
  const groupedData = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += parseFloat(transaction.amount);
    return acc;
  }, {});

  return Object.entries(groupedData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));
};

const ReportChart = ({ transactions }) => {
  const [reportType, setReportType] = useState('monthly'); 

  const data = groupByCategory(transactions); 

  return (
    <div>
      <h2>Expense by Category</h2>
      <select onChange={(e) => setReportType(e.target.value)} value={reportType}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default ReportChart;  




