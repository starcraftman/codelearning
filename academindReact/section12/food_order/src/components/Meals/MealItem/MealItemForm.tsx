import React from "react";

import Input, { InputType }  from "../../UI/Input";
import styles from "./MealItemForm.module.css";

interface PropsType {
  id: string;
  onAddToCart: (amount: number) => void;
};

const MealItemForm = (props: PropsType) => {
  const [amountValid, setAmountValid] = React.useState(true);
  const inputRef = React.useRef();
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

    const inputTarget = inputRef.current! as HTMLInputElement;
    const amount = parseInt(inputTarget.value);
    if (Number.isNaN(amount) || amount < 1 || amount > 5) {
      console.log("ERROR Adding");
      setAmountValid(false);
    }

    setAmountValid(true);
    props.onAddToCart(amount);
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input ref={inputRef} label="Amount" input={inputConfig} />
      <button>+Add</button>
      {!amountValid && <p>Please enter a valid number 1...5</p>}
    </form>
  );
};

export default MealItemForm;
