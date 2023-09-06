import React, { useRef, useContext } from "react";

import classes from "./NewTodo.module.css";
import { TodosContext } from "../store/todos-context";

const NewTodo: React.FC = () => {
    const ctx = useContext(TodosContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const text = inputRef.current!.value;
        if (text.trim().length === 0) {
            return;
        }

        ctx.addTodo(text);
    }
    
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <label htmlFor="text">Todo Text</label>
            <input ref={inputRef} type="text" id="text" />
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default NewTodo;