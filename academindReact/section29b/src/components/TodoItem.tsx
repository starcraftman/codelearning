import React from "react";

import classes from "./TodoItem.module.css"

type PropsType = {
  text: string;
  clickHandler: () => void;
};
const TodoItem: React.FC<PropsType> = (props) => {
  // const onClickHandler = (event: React.MouseEvent) => {
  //   console.log('clicked', props.text);
  // };
  return <li onClick={props.clickHandler} className={classes.item}>{props.text}</li>;
};

export default TodoItem;
