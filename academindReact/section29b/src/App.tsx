import React, { useState } from 'react';

import Todo from './models/todo';
import Todos from './components/Todos';
import NewTodo from './components/NewTodo';

const DEFAULT_TODOS = ["Learn React", "Learn Typescript"]
  .map((x) => new Todo(x));

function App() {
  const [todos, setTodos] = useState<Todo[]>(DEFAULT_TODOS);
  const addTodoHandler = (text: string) => {
    setTodos(prevState => {
      return [...prevState, new Todo(text)]
    })
  }
  const removeTodohandler = (id: string) => {
    setTodos(prevState => {
      return prevState.filter((x) => x.id !== id);
    })
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos removeHandler={removeTodohandler} items={todos} />
    </div>
  );
}

export default App;
