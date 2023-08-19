import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses(props) {
  const expenseItems = props.expenses.map((exp) => {
    return (
      <ExpenseItem title={exp.title} amount={exp.amount} date={exp.date} />
    );
  });

  return <div className="expenses">{expenseItems}</div>;
}

export default Expenses;
