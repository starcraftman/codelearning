import React from "react";
import "./ExpenseForm.css";
import { PropsType as ExpenseItemType } from "../Expenses/ExpenseItem";

interface PropsType {
    onSaveExpenseData: (expenseData: ExpenseItemType) => void;
    resetForm: () => void;
};

const ExpenseForm = (props: PropsType) => {
    const [enteredTitle, setEnteredTitle] = React.useState("");
    const titleChangeHandler = (event: React.ChangeEvent) : void => {
        setEnteredTitle((event.target as HTMLInputElement).value);
        console.log('enteredTitle', enteredTitle);
    }
    const [enteredAmount, setEnteredAmount] = React.useState("");
    const amountChangeHandler = (event: React.ChangeEvent) : void => {
        setEnteredAmount((event.target as HTMLInputElement).value);
        console.log('enteredAmount', enteredAmount);
    }

    const [enteredDate, setEnteredDate] = React.useState("");
    const dateChangeHandler = (event: React.ChangeEvent) : void => {
        setEnteredDate((event.target as HTMLInputElement).value);
        console.log('enteredDate', enteredDate);
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const expenseData = {
            title: enteredTitle,
            amount: parseFloat(enteredAmount),
            date: new Date(enteredDate)
        }
        setEnteredTitle("");
        setEnteredDate("");
        setEnteredAmount("");
        // Bubble up data
        props.onSaveExpenseData(expenseData);
        props.resetForm();
    }

    const cancelHandler = (event: React.FormEvent) => {
        event.preventDefault();
        props.resetForm();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input onChange={titleChangeHandler} value={enteredTitle} type="text" />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input onChange={amountChangeHandler} value={enteredAmount} type="number" min="0.01" step="0.01" />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input onChange={dateChangeHandler} value= {enteredDate} type="date" min="2019-01-01" step="2022-12-31" />
                </div>
                <div className="new-expense__actions">
                    <button onClick={cancelHandler}>Cancel</button>
                </div>
                <div className="new-expense__actions">
                    <button>Add Expense</button>
                </div>
            </div>
        </form>
    );
};

export default ExpenseForm;
