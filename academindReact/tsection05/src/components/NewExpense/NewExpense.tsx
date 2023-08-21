import React from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { PropsType as  ExpenseItemType } from "../Expenses/ExpenseItem";

interface PropsType {
    onAddExpense: any;
};

const NewExpense = (props: PropsType) => {
    const saveExpenseDataHandler = (enteredData: ExpenseItemType) => {
        const expenseData = {
            ...enteredData,
            id: Math.floor(Math.random() * 1000000).toString()
        }
        props.onAddExpense(expenseData);
    }

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
        </div>
    );
};

export default NewExpense;
