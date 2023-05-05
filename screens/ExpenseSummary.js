import { useContext } from "react";
import ExpensesOuput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function ExpenseSummary() {
  const expenseCtx = useContext(ExpensesContext);
  return (
    <ExpensesOuput expenses={expenseCtx.expenses} expensesPeriod="Total" emptyText= "No Expenses Found!" />
  );
}

export default ExpenseSummary;
