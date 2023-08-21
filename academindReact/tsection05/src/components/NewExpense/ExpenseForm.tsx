import React from "react";
import "./ExpenseForm.css";

interface PropsType {
    onSaveExpenseData?: any;
};

const ExpenseForm = (props: PropsType) => {
    const [enteredTitle, setEnteredTitle] = React.useState("");
    const titleChangeHandler = (event: any) : void => {
        setEnteredTitle(event.target.value);
        console.log('enteredTitle', enteredTitle);
    }
    const [enteredAmount, setEnteredAmount] = React.useState("");
    const amountChangeHandler = (event: any) : void => {
        setEnteredAmount(event.target.value);
        console.log('enteredAmount', enteredAmount);
    }

    const [enteredDate, setEnteredDate] = React.useState("");
    const dateChangeHandler = (event: any) : void => {
        setEnteredDate(event.target.value);
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
                    <button>Add Expense</button>
                </div>
            </div>
        </form>
    );
};

export default ExpenseForm;
