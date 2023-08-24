import React from "react";

import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

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
  const cartCtx = React.useContext(CartContext);
  const addToCart = (amount: number) => {
    console.log('addToCart', amount);
    console.log(cartCtx);
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      price: props.meal.price,
      amount: amount
    })
  }
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description}</div>
        <div className={styles.price}>{formatter.format(props.meal.price)}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCart} id={props.meal.id}/>
      </div>
    </li>
  );
};

export default MealItem;
