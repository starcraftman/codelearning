import React from "react";

import "./Card.css";

interface PropsType {
  className: string;
  children: any;
};

const Card = (props: PropsType) => {
  const classes = `card ${props.className}`;
  return <div className={classes}>{props.children}</div>
}

export default Card;
