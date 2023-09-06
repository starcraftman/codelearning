
import React from "react";
import TodoModel from "../models/todo";
import TodoItem from "./TodoItem";

type PropsType = {
    items: TodoModel[];
};
const Todos: React.FC<PropsType> = (props) => {
    const listItems = props.items.map((x) => <TodoItem key={x.id} text={x.text} />);

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export default Todos;