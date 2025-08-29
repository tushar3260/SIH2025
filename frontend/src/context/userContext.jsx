import React, { createContext, useState, useContext } from "react";

// Context create
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // initially no user

  // Example function to login & set user data
  const login = (userData) => {
    setUser(userData); // userData = { id, name, email }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for using context
export const useUser = () => useContext(UserContext);
