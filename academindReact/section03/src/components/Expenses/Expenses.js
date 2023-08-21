import React from "react";

import Card from "./../UI/Card"
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

const Expenses = (props) => {
  const expenseItems = props.expenses.map((exp) => {
    return (
      <ExpenseItem title={exp.title} amount={exp.amount} date={exp.date} />
    );
  });

  return <Card className="expenses">{expenseItems}</Card>;
}

export default Expenses;
