import React, { useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  React.useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "1") {
      setIsLoggedIn(true);
    }
  },
  []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const providerValue = {
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler
  }
  return (
    <AuthContext.Provider value={providerValue}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
