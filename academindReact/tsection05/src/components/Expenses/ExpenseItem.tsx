import React, { useState } from "react";

import Card from "./../UI/Card"
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

export interface PropsType {
  id?: string;
  amount: number;
  date: Date;
  title: string;
};

const ExpenseItem = (props: PropsType) => {
  const [title, setTitle] = useState(props.title)

  const clickHandler = () => {
    setTitle("Updated");
    console.log("Updated the title")
  }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{props.amount}</div>
        <button onClick={clickHandler}>Change Title</button>
      </div>
    </Card>
  );
}

export default ExpenseItem;
