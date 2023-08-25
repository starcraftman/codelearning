import React from "react";

import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import useHttp from "../../hooks/use-http";

export interface CartItemType {
  id: string;
  name: string;
  amount: number;
  price: number;
}

interface CartProps {
  onClose: () => void;
}

const requestConfig = {
  url: 'https://react-http-51865-default-rtdb.firebaseio.com/orders.json',
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: ""
}

const Cart = (props: CartProps) => {
  const cartCtx = React.useContext(CartContext);
  const onAddHandler = (item: CartItemType) => {
    cartCtx.addItem({
      ...item,
      amount: 1
    });

  };
  const onRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };
  const cartItems = cartCtx.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        item={item}
        onAdd={onAddHandler.bind(null, item)}
        onRemove={onRemoveHandler.bind(null, item.id)}
      />
    );
  });
  const hasItems = cartCtx.items.length > 0;

  const clearHandler = () => {
    cartCtx.clearCart();
    props.onClose();
  }

  const { sendRequest: sendOrder } = useHttp();
  const orderHandler = async () => {
    console.log("Order placed for: ", cartCtx.items);
    requestConfig.body = JSON.stringify(cartCtx.items);
    const processOrder = (data: any) => {
      console.log(data);
    }

    await sendOrder(requestConfig, processOrder);
    clearHandler();
};

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles['cart-items']}>
        {cartItems}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{cartCtx.getTotal()}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onClose} className={styles["button--alt"]}>
          Close
        </button>
        {hasItems && <button onClick={clearHandler} className={styles["button--alt"]}>Clear</button>}
        {hasItems && <button onClick={orderHandler} className={styles.button}>Order</button> }
      </div>
    </Modal>
  );
};

export default Cart;
