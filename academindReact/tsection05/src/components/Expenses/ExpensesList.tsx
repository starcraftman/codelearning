import React from 'react';

import ExpenseItem, { PropsType as ExpenseItemType } from "./ExpenseItem";
import "./ExpensesList.css";

interface PropsType {
    items: ExpenseItemType[];
}

const ExpensesList = (props: PropsType) => {
    if (props.items.length === 0) {
        return (
            <h2 className="expenses-list__fallback">
                Found no expenses.
            </h2>
        );
    }
    const expensesContent = props.items
        .map((exp: ExpenseItemType) => {
            return (
                <ExpenseItem
                    key={exp.id}
                    title={exp.title}
                    amount={exp.amount}
                    date={exp.date}
                />
            );
        });

    return (
        <ul className="expenses-list">
            {expensesContent}
        </ul>);
};

export default ExpensesList;
