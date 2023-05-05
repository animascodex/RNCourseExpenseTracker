import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of Slippers",
    amount: 29.3,
    date: new Date("2023-02-24"),
  },
  {
    id: "e2",
    description: "A Black Shirt",
    amount: 19.3,
    date: new Date("2023-03-19"),
  },
  {
    id: "e3",
    description: "A nice pair of Jeans",
    amount: 79.5,
    date: new Date("2023-03-24"),
  },
  {
    id: "e4",
    description: "A Book by a famous author",
    amount: 59.25,
    date: new Date("2023-04-10"),
  },
  {
    id: "e5",
    description: "A piece of Art",
    amount: 102.45,
    date: new Date("2023-04-29"),
  },
  {
    id: "e6",
    description: "A Black Shirt",
    amount: 19.3,
    date: new Date("2023-03-19"),
  },
  {
    id: "e7",
    description: "A nice pair of Jeans",
    amount: 79.5,
    date: new Date("2023-03-24"),
  },
  {
    id: "e8",
    description: "A Book by a famous author",
    amount: 59.25,
    date: new Date("2023-04-30"),
  },
  {
    id: "e9",
    description: "A piece of Art",
    amount: 102.45,
    date: new Date("2023-04-29"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function ExpensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const ExpenseUpdateIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const ExpenseUpdate = state[ExpenseUpdateIndex];
      const ExpenseUpdated = { ...ExpenseUpdate, ...action.payload.data };
      const UpdatedExpenses = [...state];
      UpdatedExpenses[ExpenseUpdateIndex] = ExpenseUpdated;
      return UpdatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(ExpensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
