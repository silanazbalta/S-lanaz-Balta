import { useState } from 'react';
import { useDispatch } from 'react-redux';

const BudgetForm = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { description, amount: parseFloat(amount), date, category };
    dispatch({ type: 'ADD_EXPENSE', payload: expense }); 
    setDescription('');
    setAmount('');
    setDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default BudgetForm;
