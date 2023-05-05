import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import ExpenseInput from "./ExpenseInput";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function expenseChangedHandler(inputIdentifier, enteredExpense) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredExpense, isValid: true },
      };
    });
  }

  function confirmHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const expenseAmountIsValid =
      !isNaN(expenseData.amount) && expenseData.amount > 0;
    const expenseDateIsValid = expenseData.date.toString() !== "Invalid Date";
    const expenseDescriptionIsValid = expenseData.description.trim().length > 0;

    if (
      !expenseAmountIsValid ||
      !expenseDateIsValid ||
      !expenseDescriptionIsValid
    ) {
      //Show some Visual Feedback
      // Alert.alert("Invalid Expense Input, Please Check the Details Entered!");
      setInputs((currentInputValues) => {
        return {
          amount: {
            value: currentInputValues.amount.value,
            isValid: expenseAmountIsValid,
          },
          date: {
            value: currentInputValues.date.value,
            isValid: expenseDateIsValid,
          },
          description: {
            value: currentInputValues.description.value,
            isValid: expenseDescriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const expenseIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.titleContainer}>Your Expense Form</Text>
      <View style={styles.inputsRow}>
        <ExpenseInput
          style={styles.rowInput}
          label={"Amount"}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: expenseChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <ExpenseInput
          style={styles.rowInput}
          label={"Date"}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: expenseChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <ExpenseInput
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false default is True
          // autoCapitalize: 'words or characters or none' default is sentences
          onChangeText: expenseChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {expenseIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Expense Input- Please Check your Entered Data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
  titleContainer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowInput: {
    flex: 1,
  },

  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
