import { StyleSheet, View } from "react-native";
import ExpenseSummary from "./ExpensesSummary";
import ExpensesList from "./ExpnesesList";
import { GlobalStyles } from "../../constants/styles";

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
    date: new Date("2023-04-10"),
  },
  {
    id: "e9",
    description: "A piece of Art",
    amount: 102.45,
    date: new Date("2023-04-29"),
  },
];

function ExpensesOuput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOuput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
