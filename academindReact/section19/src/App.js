import React from "react";

import Auth from "./components/Auth";
import Counter from './components/Counter';
import Header from "./components/Header"

function App() {
  return (
    <React.Fragment>
      <Header />
      <Auth />
      <Counter />
    </React.Fragment>
  );
}

export default App;
