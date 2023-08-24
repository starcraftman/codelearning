import React from 'react';

import './App.css';
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [showCart, setShowCart] = React.useState(false);


  return (
    <React.StrictMode>
      <React.Fragment>
        {showCart && <Cart onClose={() => setShowCart(false)} />}
        <Header onShowCart={() => setShowCart(true)} />
        <main>
          <Meals />
        </main>
      </React.Fragment>
    </React.StrictMode>
  );
}

export default App;
