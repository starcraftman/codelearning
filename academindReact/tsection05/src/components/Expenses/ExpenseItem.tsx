import React from "react";

import Card from "./../UI/Card"
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

export interface PropsType {
  id?: string;
  key?: string;
  amount: number;
  date: Date;
  title: string;
};

const ExpenseItem = (props: PropsType) => {

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">{props.amount}</div>
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
