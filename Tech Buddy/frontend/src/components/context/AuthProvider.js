
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/login")
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

