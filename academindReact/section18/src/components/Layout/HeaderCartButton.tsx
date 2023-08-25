import React from "react";

import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

interface PropsType {
  onClick: () => void;
}

const HeaderCartButton = (props: PropsType) => {
  const [animateButton, setAnimateButton] = React.useState(false);
  const cartCtx = React.useContext(CartContext);
  const btnClasses = `${styles.button} ${animateButton ? styles.bump : ""}`;
  React.useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    setAnimateButton(true);
    const timeout = setTimeout(() => {
      setAnimateButton(false);
    }, 300)

    return () => {
      clearTimeout(timeout);
    }
  }, [cartCtx.items]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{cartCtx.getNumItems()}</span>
    </button>
  );
};

export default HeaderCartButton;
