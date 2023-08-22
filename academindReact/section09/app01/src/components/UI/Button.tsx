import React from "react";

interface ButtonPropsType {
    children: string | number | React.ReactElement;
    className: string;
    onClick?: React.MouseEventHandler;
};

const CalcForm = (props: ButtonPropsType) => {
    return (
        <button onClick={props.onClick} type="submit" className={props.className}>
            {props.children}
        </button>
    );
};

export default CalcForm;