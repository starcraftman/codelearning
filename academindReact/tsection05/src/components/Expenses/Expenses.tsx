import React from "react";

import Card from "./../UI/Card"
import ExpenseItem, { PropsType as ExpenseItemProp } from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";

import "./Expenses.css";

export interface PropsType {
  expenses: ExpenseItemProp[]
};

const Expenses = (props: PropsType) => {
  const [filter, setFilter] = React.useState("2020");
  const onFilterChangeHandler = (selectedYear: string) => {
    setFilter(selectedYear);
    console.log(`Expenses filter now set to  ${selectedYear}`);
  };

  const expenseItems = props.expenses.map((exp: ExpenseItemProp) => {
    return (
      <ExpenseItem title={exp.title} amount={exp.amount} date={exp.date} />
    );
  });

  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter selected={filter} onFilterChange={onFilterChangeHandler}/>
        {expenseItems}
      </Card>
    </div>
  );
}

export default Expenses;
