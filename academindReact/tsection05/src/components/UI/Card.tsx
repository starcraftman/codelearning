import React from "react";

import "./Card.css";

interface PropsType {
  className: string;
  children: React.ReactNode;
};

const Card = (props: PropsType) => {
  const classes = `card ${props.className}`;
  return <div className={classes}>{props.children}</div>
}

export default Card;
