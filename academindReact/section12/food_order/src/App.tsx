import React from 'react';

import './App.css';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  return (
    <React.StrictMode>
      <React.Fragment>
        <Header/>
        <main>
          <Meals />
        </main>
      </React.Fragment>
    </React.StrictMode>
  );
}

export default App;
