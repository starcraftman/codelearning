import React from "react";

import styles from "./Card.module.css";

interface PropsType {
  children: string | number | React.ReactNode | React.ReactNode[];
}

const Card = (props: PropsType) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default Card;
