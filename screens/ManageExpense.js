import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);

  const modifyExpenseId = route.params?.expenseId;
  const isModifying = !!modifyExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id == modifyExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isModifying ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isModifying]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(modifyExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if (isModifying) {
      expenseCtx.updateExpense(modifyExpenseId, expenseData);
    } else {
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isModifying ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues = {selectedExpense}
      />

      {isModifying && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
