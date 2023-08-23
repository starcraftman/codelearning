import React from "react";

// Creates a global available object passed into func
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "1") {
      setIsLoggedIn(true);
    }
  },
  []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  }

  const providerValue = {
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };
  return (<AuthContext.Provider value={providerValue}>
    {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;  // Is a component ish?
