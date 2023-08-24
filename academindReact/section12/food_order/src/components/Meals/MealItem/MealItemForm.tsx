import React from "react";

import Input, { InputType }  from "../../UI/Input";
import styles from "./MealItemForm.module.css";

interface PropsType {
  id: string;
  addToCartHandler: (amount: number) => void;
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
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    const amount = parseInt(target.value);
    console.log(amount, typeof amount);
    if (Number.isNaN(amount) || amount < 1 || amount > 5) {
      console.log("ERROR Adding");
      return;
    }

    props.addToCartHandler(amount);
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input label="Amount" input={inputConfig} />
      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
