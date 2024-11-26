import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';


const ReportChart = dynamic(() => import('../components/ReportChart'), { ssr: false });
import BudgetForm from '../components/BudgetForm';
import BudgetLimitForm from '../components/BudgetLimitForm';
import ExpenseChart from '../components/ExpenseChart';
//import ExpenseBarChart from '../components/ExpenseBarChart';

const Home = () => {
  const expenses = useSelector((state) => state.expenses); 
  const income = useSelector((state) => state.income); 
  const [transactions, setTransactions] = useState([]); 

  useEffect(() => {
   
    setTransactions([
      ...expenses,
      { description: 'Income', amount: income, date: new Date().toISOString(), category: 'Income' },
    ]);
  }, [expenses, income]);

  return (
    <div className="container">
      <header className="header">
        <h1>Personal Budget Tracker</h1>
        <p>Track your expenses, manage your budget, and visualize your financial data!</p>
      </header>

      <div className="main-content">
        <div className="form-container">
          <h2>Add Income/Expense</h2>
          <BudgetForm />
          <h2>Set Budget Limits</h2>
          <BudgetLimitForm />
        </div>

        <div className="chart-container">
  <h2>Expense Breakdown</h2>
  <ExpenseChart expenses={expenses} />
</div>

      </div>

      <div className="chart-container">
        <ReportChart transactions={transactions} />
      </div>
    </div>
  );
};

export default Home;
