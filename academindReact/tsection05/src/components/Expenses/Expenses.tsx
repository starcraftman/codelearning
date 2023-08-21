import React from "react";

import Card from "./../UI/Card"
import ExpenseItem, { PropsType as ExpenseItemProp } from "./ExpenseItem";

import "./Expenses.css";

export interface PropsType {
  expenses: ExpenseItemProp[]
};

const Expenses = (props: PropsType) => {
  const expenseItems = props.expenses.map((exp: ExpenseItemProp) => {
    return (
      <ExpenseItem title={exp.title} amount={exp.amount} date={exp.date} />
    );
  });

  return <Card className="expenses">{expenseItems}</Card>;
}

export default Expenses;
