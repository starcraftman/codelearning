
import React from "react";
import TodoModel from "../models/todo";
import TodoItem from "./TodoItem";

import classes from "./Todos.module.css";

type PropsType = {
    items: TodoModel[];
    removeHandler: (id: string) => void;
};
const Todos: React.FC<PropsType> = (props) => {
    const listItems = props.items.map((x) => <TodoItem clickHandler={props.removeHandler.bind(null, x.id)} key={x.id} {...x} />);

    return (
        <ul className={classes.todos}>
            {listItems}
        </ul>
    );
}

export default Todos;