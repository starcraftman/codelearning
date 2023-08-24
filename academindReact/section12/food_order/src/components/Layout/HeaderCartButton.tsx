import React from "react";

import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

interface PropsType {
  onClick: () => void;
}

const HeaderCartButton = (props: PropsType) => {
  const cartCtx = React.useContext(CartContext);
  return (
    <button onClick={props.onClick} className={styles.button}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{cartCtx.getNumItems()}</span>
    </button>
  );
};

export default HeaderCartButton;
