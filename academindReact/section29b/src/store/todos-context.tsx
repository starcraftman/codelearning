import React, { useState } from "react";
import Todo from "../models/todo";

const DEFAULT_TODOS = ["Learn React", "Learn Typescript"]
  .map((x) => new Todo(x));
type TodoContextType = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};
export const TodosContext = React.createContext<TodoContextType>({
  items: DEFAULT_TODOS,
  addTodo: (text: string) => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodoHandler = (text: string) => {
    setTodos((prevState) => {
      return [...prevState, new Todo(text)];
    });
  };
  const removeTodohandler = (id: string) => {
    setTodos((prevState) => {
      return prevState.filter((x) => x.id !== id);
    });
  };
  const providerValue: TodoContextType = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodohandler
  };

  return (
    <TodosContext.Provider value={providerValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;