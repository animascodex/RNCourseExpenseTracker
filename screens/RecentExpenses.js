import { useContext, useEffect, useState } from "react";
import ExpensesOuput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { ExpensesContext } from "../store/expenses-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not Fetch Expenses!");
      }
      setIsFetching(false);
      expenseCtx.setExpenses(expenses);
    }

    getExpenses();
  }, []);


  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
