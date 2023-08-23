import React from "react";

// Creates a global available object passed into func
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}
});

export default AuthContext;  // Is a component ish?
