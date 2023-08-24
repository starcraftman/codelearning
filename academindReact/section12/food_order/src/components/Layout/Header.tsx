import React from "react";

import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton"

interface PropsType {
  onShowCart: () => void;
}

const Header = (props: PropsType) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Reactmeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="Delicious food on a table." />
      </div>
    </React.Fragment>
  );
};

export default Header;
