import React from "react";

import Input, { InputType }  from "../../UI/Input";
import styles from "./MealItemForm.module.css";

interface PropsType {
  id: string;
};

const MealItemForm = (props: PropsType) => {
  const inputConfig: InputType = {
    id: `amount ${props.id}`,
    type: "number",
    min: "1",
    max: "5",
    step: "1",
    defaultValue: "1"
  };

  return (
    <form className={styles.form}>
      <Input label="Amount" input={inputConfig} />
      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
