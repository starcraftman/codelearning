import React, { useRef } from "react";

import classes from "./NewTodo.module.css";

type PropsType = {
    onAddTodo: (text: string) => void;
};
const NewTodo: React.FC<PropsType> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const text = inputRef.current!.value;
        if (text.trim().length === 0) {
            return;
        }

        props.onAddTodo(text);
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