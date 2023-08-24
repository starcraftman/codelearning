import React from "react";

import styles from "./CartItem.module.css";
import { CartItemType } from "./Cart";
import { formatMoney } from "../../util";

interface PropsType {
  item: CartItemType;
  onAdd: () => void;
  onRemove: () => void;
};

const CartItem = (props: PropsType) => {
    const item = props.item;
    return (
        <li className={styles['cart-item']}>
          <div>
            <h2>{item.name}</h2>
            <div className={styles.summary}>
              <span className={styles.price}>{formatMoney(item.price)}</span>
              <span className={styles.amount}>x {item.amount}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button onClick={props.onRemove}>−</button>
            <button onClick={props.onAdd}>+</button>
          </div>
        </li>
      );
}

export default CartItem;
