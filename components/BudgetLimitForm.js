import { useState } from 'react';
import { useDispatch } from 'react-redux';

const BudgetLimitForm = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_BUDGET_LIMIT',
      category,
      limit: parseFloat(limit), 
    });
    setCategory('');
    setLimit('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Budget Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <button type="submit">Set Budget Limit</button>
    </form>
  );
};

export default BudgetLimitForm;


