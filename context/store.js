import { createStore } from 'redux';
import { toast } from 'react-toastify';

const initialState = {
  expenses: [],
  budgetLimits: {}, 
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newExpenses = [...state.expenses, action.payload];
      checkBudgetLimits(newExpenses, state.budgetLimits);
      return { ...state, expenses: newExpenses };

    case 'SET_BUDGET_LIMIT':
      return {
        ...state,
        budgetLimits: {
          ...state.budgetLimits,
          [action.category]: action.limit, 
        },
      };

    default:
      return state;
  }
};


const checkBudgetLimits = (expenses, budgetLimits) => {
  const totalExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += parseFloat(expense.amount);
    return acc;
  }, {});

  Object.keys(totalExpenses).forEach((category) => {
    if (
      budgetLimits[category] &&
      totalExpenses[category] >= budgetLimits[category] * 0.8
    ) {
      toast.warn(
        `Warning: You've reached 80% of your budget for ${category}!`, 
        { position: 'top-right' }
      );
    }
  });
};

const store = createStore(budgetReducer);

export default store;

