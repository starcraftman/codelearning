import React from "react";

import styles from "./Input.module.css";

export interface InputType {
  id: string;
  type: string;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
}

interface PropsType {
  label: string;
  input: InputType;
}

const Input = React.forwardRef((props: PropsType, ref: any) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
