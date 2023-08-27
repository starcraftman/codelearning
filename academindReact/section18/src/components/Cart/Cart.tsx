import React from "react";

import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout, { CheckoutFormType } from "./Checkout";
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
  url: "https://react-http-51865-default-rtdb.firebaseio.com/orders.json",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: "",
};

const Cart = (props: CartProps) => {
  const [showCart, setShowCart] = React.useState(false);
  const [orderSent, setOrderSent] = React.useState(false);
  const cartCtx = React.useContext(CartContext);
  const onAddHandler = (item: CartItemType) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
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
  };

  const { error, isLoading, sendRequest: sendOrder } = useHttp();
  const orderHandler = () => {
    console.log("Placing order, moving to checkout for: ", cartCtx.items);
    setShowCart(true);
  };

  const processCheckout = async (formData: CheckoutFormType) => {
    setOrderSent(false);
    requestConfig.body = JSON.stringify({
      items: cartCtx.items,
      total: cartCtx.totalAmount.toFixed(2),
      user: formData
    });
    await sendOrder(requestConfig, () => null);
    if (!error) {
      setOrderSent(true);
      clearHandler();
    }
  };

  const modalActions = (
    <div className={styles.actions}>
      <button onClick={props.onClose} className={styles["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={clearHandler} className={styles["button--alt"]}>
          Clear
        </button>
      )}
      {hasItems && (
        <button onClick={orderHandler} className={styles.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{cartCtx.getTotal()}</span>
      </div>
      {showCart && (
        <Checkout
          cancelHandler={props.onClose}
          submitHandler={processCheckout}
        />
      )}
      {!showCart && modalActions}
    </React.Fragment>
  );

  const isSubmittingContent = <p>Sending order data...</p>
  const didSubmitContent = <p>Order has been placed, please be patient.</p>

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !orderSent && cartModalContent}
      {isLoading && !orderSent && isSubmittingContent}
      {!isLoading && orderSent && didSubmitContent}
    </Modal>
  );
};

export default Cart;
