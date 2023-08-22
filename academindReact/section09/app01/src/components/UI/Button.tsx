import React from "react";

import style from "./Button.module.css"

interface ButtonPropsType {
    children: string | number | React.ReactElement;
    className: string;
    onClick?: React.MouseEventHandler;
};

const CalcForm = (props: ButtonPropsType) => {
    return (
        <button className={props.className === "button" ? style.button : style.buttonAlt} onClick={props.onClick} type="submit">
            {props.children}
        </button>
    );
};

export default CalcForm;