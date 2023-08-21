import React from "react";

import Card from "./../UI/Card"
import ExpenseItem, { PropsType as ExpenseItemProp } from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";

import "./Expenses.css";

export interface PropsType {
  expenses: ExpenseItemProp[]
};

const Expenses = (props: PropsType) => {
  const [filteredYear, setFilteredYear] = React.useState("2020");
  const onFilterChangeHandler = (selectedYear: string) => {
    setFilteredYear(selectedYear);
    console.log(`Expenses filter now set to  ${selectedYear}`);
  };

  const expenseItems = props.expenses
    .filter((item) => {
      return item.date.getFullYear() === parseInt(filteredYear);
    })
    .map((exp: ExpenseItemProp) => {
      return (
        <ExpenseItem key={exp.id} title={exp.title} amount={exp.amount} date={exp.date} />
      );
    });
  let expensesContent : any = <p>No items found!</p>;
  if (expenseItems.length > 0) {
    expensesContent = expenseItems;
  }

  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter selected={filteredYear} onFilterChange={onFilterChangeHandler}/>
        {expensesContent}
      </Card>
    </div>
  );
}

export default Expenses;
