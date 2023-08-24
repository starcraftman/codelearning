import React from "react";

import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

interface CartItemType {
  id: string;
  name: string;
  amount: number;
  price: number;
};

interface CartProps {
  onClose: () => void;
}

const Cart = (props: CartProps) => {
  const cartData: CartItemType[] = [{
    id: "c1",
    name: "Sushi",
    amount: 2,
    price: 12.99
  }];
  const cartItems = cartData.map((item) => {
    return <li key={item.id}>{item.name}</li>
  });

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onClose} className={styles['button--alt']}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
