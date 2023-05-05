import { useContext } from "react";
import ExpensesOuput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
  const RecentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const sevenDaysDate = getDateMinusDays(today, 7);

    return expense.date >= sevenDaysDate && expense.date <= today;
  });
  return (
    <ExpensesOuput
      expenses={RecentExpenses}
      expensesPeriod="Last 7 Days"
      emptyText="No Expenses Registered in the last 7 Days"
    />
  );
}

export default RecentExpenses;
