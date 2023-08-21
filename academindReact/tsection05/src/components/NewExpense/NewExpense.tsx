import React from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { PropsType as  ExpenseItemType } from "../Expenses/ExpenseItem";

interface PropsType {
    onAddExpense: (expenseData: ExpenseItemType) => void;
};

const NewExpense = (props: PropsType) => {
    const [addNewClicked, setAddNewClicked] = React.useState(false);
    const saveExpenseDataHandler = (enteredData: ExpenseItemType) => {
        const expenseData = {
            ...enteredData,
            id: Math.floor(Math.random() * 1000000).toString()
        }
        props.onAddExpense(expenseData);
    }

    const expenseButton = <button onClick={() => setAddNewClicked(true)}>Add New Expense</button>;
    const expenseForm = <ExpenseForm resetForm={() => setAddNewClicked(false)} onSaveExpenseData={saveExpenseDataHandler}/>;
    return (
        <div className="new-expense">
            {addNewClicked ? expenseForm : expenseButton}
        </div>
    );
};

export default NewExpense;
