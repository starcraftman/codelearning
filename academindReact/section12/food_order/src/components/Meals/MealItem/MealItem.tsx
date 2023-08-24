import React from "react";

import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

export interface MealItemType {
  id: string;
  name: string;
  description: string;
  price: number;
};

interface PropsType {
  meal: MealItemType;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const MealItem = (props: PropsType) => {
  const addToCart = (amount: number) => {
    const item = {
      id: props.meal.id,
      name: props.meal.name,
      price: props.meal.price,
      amount: amount
    }
    console.log(item);
  }
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description}</div>
        <div className={styles.price}>{formatter.format(props.meal.price)}</div>
      </div>
      <div>
        <MealItemForm addToCartHandler={addToCart} id={props.meal.id}/>
      </div>
    </li>
  );
};

export default MealItem;
