import React from "react";

import Card from "./../UI/Card"
import ExpenseItem, { PropsType as ExpenseItemProp } from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";

import "./Expenses.css";

export interface PropsType {
  expenses: ExpenseItemProp[]
};

const Expenses = (props: PropsType) => {
  const [filter, setFilter] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(props.expenses);
  const onFilterChangeHandler = (selectedYear: string) => {
    setFilter(selectedYear);
    console.log(`Expenses filter now set to  ${selectedYear}`);
    const newFilteredItems = props.expenses.filter((item) => {
        return item.date.getFullYear() === parseInt(selectedYear);
    });
    setFilteredItems(newFilteredItems);
  };

  const expenseItems = filteredItems.map((exp: ExpenseItemProp) => {
    return (
      <ExpenseItem key={exp.id} title={exp.title} amount={exp.amount} date={exp.date} />
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
