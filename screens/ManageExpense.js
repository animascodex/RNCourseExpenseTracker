import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState();

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

  async function deleteExpenseHandler() {
    setIsSending(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(modifyExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - Please try again later!");
      setIsSending(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSending(true);
    try {
      if (isModifying) {
        expenseCtx.updateExpense(modifyExpenseId, expenseData);
        await updateExpense(modifyExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could Not Save Data - Please Try Again Later!");
    }
  }


  if (error && !isModifying) {
    return <ErrorOverlay message={error} />;
  }

  if (isSending) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isModifying ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
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
