import React from "react";

import classes from "./Button.module.css";

interface PropsType {
    type: "button" | "submit" | "reset" | undefined;
    onClick: any;
    children: string | React.ReactNode | React.ReactNode[];
};

const Button = (props: PropsType) => {
    return (
        <button
            className={classes.button}
            type={props.type || "button"}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;