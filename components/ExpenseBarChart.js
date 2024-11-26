
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const groupByCategory = (expenses) => {
  const groupedData = expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += parseFloat(expense.amount);
    return acc;
  }, {});

  return Object.entries(groupedData).map(([category, amount]) => ({
    category,
    amount,
  }));
};

const ExpenseBarChart = ({ expenses }) => {
 
  const data = groupByCategory(expenses);

  return (
    <BarChart width={500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
};

export default ExpenseBarChart;
