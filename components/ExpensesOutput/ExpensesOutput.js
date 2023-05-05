import { StyleSheet, Text, View } from "react-native";
import ExpenseSummary from "./ExpensesSummary";
import ExpensesList from "./ExpnesesList";
import { GlobalStyles } from "../../constants/styles";

function ExpensesOuput({ expenses, expensesPeriod, emptyText }) {
  let ListContent = (
    <Text style={styles.emptyContainerText}>{emptyText}</Text>
  );

  if (expenses.length > 0) {
    ListContent = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
      {ListContent}
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
  emptyContainerText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
