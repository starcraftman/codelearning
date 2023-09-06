import React from "react";

type PropsType = {
  text: string;
};
const TodoItem: React.FC<PropsType> = (props) => {
  return <li>{props.text}</li>;
};

export default TodoItem;
