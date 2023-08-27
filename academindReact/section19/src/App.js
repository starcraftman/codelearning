import React from "react";
import { useSelector } from 'react-redux';

import Auth from "./components/Auth";
import Counter from './components/Counter';
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  return (
    <React.Fragment>
      <Header />
      {isAuth ? <UserProfile /> : <Auth />}
      <Counter />
    </React.Fragment>
  );
}

export default App;
