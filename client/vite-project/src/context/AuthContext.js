import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/users/me')
      .then((response) => {
        console.log(response);
        setUser(response.data.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return React.createElement(
    AuthContext.Provider,
    { value: { user, setUser } },
    children
  );
};
