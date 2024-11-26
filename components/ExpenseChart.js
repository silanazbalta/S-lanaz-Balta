import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const groupByCategory = (expenses) => {
  const groupedData = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized'; 
    if (!acc[category]) acc[category] = 0;
    acc[category] += parseFloat(expense.amount);
    return acc;
  }, {});

  return Object.entries(groupedData).map(([category, amount]) => ({
    category,
    amount,
  }));
};

const ExpenseChart = ({ expenses }) => {
  const data = groupByCategory(expenses); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Çubuk Grafik */}
      <div>
        <h3>Category Breakdown (Bar Chart)</h3>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Pasta Grafik */}
      <div>
        <h3>Category Breakdown (Pie Chart)</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default ExpenseChart;

