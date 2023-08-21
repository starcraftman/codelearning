import React from "react";

import "./ExpenseDate.css";

interface PropsType {
  date: Date;
};

const ExpenseDate = (props : PropsType) => {
  const month: string = props.date.toLocaleString("en-US", { month: "long" });
  const year: string = props.date.toLocaleString("en-US", { year: "numeric" });
  const day: string = props.date.toLocaleString("en-US", { day: "2-digit" });

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
