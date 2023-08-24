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

const Input = (props: PropsType) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
