import React from "react";
import "./ExpenseForm.css";

const ExpenseForm = () => {
    const [enteredTitle, setEnteredTitle] = React.useState('title');
    const titleChangeHandler = (event: any) : void => {
        setEnteredTitle(event.target.value);
        console.log('enteredTitle', enteredTitle);
    }
    const [enteredAmount, setEnteredAmount] = React.useState(0);
    const amountChangeHandler = (event: any) : void => {
        setEnteredAmount(event.target.value as number);
        console.log('enteredAmount', enteredAmount);
    }

    const [enteredDate, setEnteredDate] = React.useState(new Date());
    const dateChangeHandler = (event: any) : void => {
        // Alternative to below for complex state updates with previous
        // setEnteredDate((prevState) => {
            // return event.target.value;
        // });
        setEnteredDate(event.target.value);
        console.log('enteredDate', enteredDate.toLocaleString());
    }

    const inputChangeHandler = (identifer: string, value: any) : void => {
        if (identifer === "title") {
            setEnteredTitle(value);
        } else if (identifer === "amount") {
            setEnteredAmount(value as number);
        } else {
            setEnteredDate(value);
        }
    };

    return (
        <form>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input onChange={(event) => inputChangeHandler('title', event.target.value)} type="text" />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input onChange={(event) => inputChangeHandler('amount', event.target.value)} type="number" min="0.01" step="0.01" />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input onChange={(event) => inputChangeHandler('date', event.target.value)} type="date" min="2019-01-01" step="2022-12-31" />
                </div>
                <div className="new-expense__actions">
                    <button>Add Expense</button>
                </div>
            </div>
        </form>
    );
};

export default ExpenseForm;
