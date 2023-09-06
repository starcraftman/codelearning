import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodosContext } from "../store/todos-context";

import classes from "./Todos.module.css";

const Todos: React.FC = () => {
 const ctx = useContext(TodosContext);
  const listItems = ctx.items.map((x) => (
    <TodoItem
      clickHandler={ctx.removeTodo.bind(null, x.id)}
      key={x.id}
      {...x}
    />
  ));

  return <ul className={classes.todos}>{listItems}</ul>;
};

export default Todos;
