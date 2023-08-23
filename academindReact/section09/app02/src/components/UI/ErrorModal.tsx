import React from "react";

import classes from "./ErrorModal.module.css"
import Card from "./Card";
import Button from "./Button";

export interface ErrorModalInputType {
    title: string;
    message: string;
}

interface PropsType {
    errorData: ErrorModalInputType;
    onModalClick: () => void;
}

const ErrorModal = (props: PropsType) => {

    return (
        <div>
            <div onClick={props.onModalClick} className={classes.backdrop}/>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.errorData.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.errorData.message}</p>
                </div>
                <footer className={classes.actions}>
                    <Button type="button" onClick={props.onModalClick}>Okay</Button>
                </footer>
            </Card>
        </div>
    );
}

export default ErrorModal;