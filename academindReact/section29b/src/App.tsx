import React from 'react';
import Todo from './models/todo';
import Todos from './components/Todos';

function App() {
  const items = ["Learn React", "Learn Typescript"];
  const todos = items.map((x) => new Todo(x));

  return (
    <div className="App">
      <Todos items={todos} />
    </div>
  );
}

export default App;
