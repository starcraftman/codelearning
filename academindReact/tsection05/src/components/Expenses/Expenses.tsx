import React from "react";

import Card from "./../UI/Card"
import { PropsType as ExpenseItemType } from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

import "./Expenses.css";

export interface PropsType {
  expenses: ExpenseItemType[]
};

const Expenses = (props: PropsType) => {
  const [filteredYear, setFilteredYear] = React.useState("2020");
  const onFilterChangeHandler = (selectedYear: string) => {
    setFilteredYear(selectedYear);
    console.log(`Expenses filter now set to  ${selectedYear}`);
  };

  const filteredExpenses = props.expenses.filter((item) => {
    return item.date.getFullYear() === parseInt(filteredYear);
  })

  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter selected={filteredYear} onFilterChange={onFilterChangeHandler}/>
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses}/>
      </Card>
    </div>
  );
}

export default Expenses;
