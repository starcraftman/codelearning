import React from "react";

import classes from "./Card.module.css";

interface PropsType {
    className: string;
    children: React.ReactNode | React.ReactNode[];
}

const Card = (props: PropsType) => {
    const divClass = `${classes.card} ${props.className}`
    return (
        <div className={divClass}>
            {props.children}
        </div>
    );
}

export default Card;