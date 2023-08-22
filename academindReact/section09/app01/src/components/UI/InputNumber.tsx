import React from "react";

import CalcInputData from "../CalcFormInput";

interface ButtonPropsType {
    children: string | number | React.ReactElement;
    htmlFor: keyof CalcInputData;
    fieldValue: number;
    onChangeHandler: (event: React.ChangeEvent) => void;
};

const InputNumber = (props: ButtonPropsType) => {
    return (
        <p>
            <label htmlFor={props.htmlFor}>{props.children}</label>
            <input value={props.fieldValue} onChange={props.onChangeHandler} type="number" id={props.htmlFor} />
        </p>
    );
};

export default InputNumber;