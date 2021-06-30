import React, { createContext, useEffect, useState } from "react";

const Context = createContext();

function AuthProvider({ children }) {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const setUserIdFromToken = (token) => {
    if (token) {
      const parse = JSON.parse(atob(token.split(".")[1]));
      setUserId(parse.userId);
    }
  };
  useEffect(() => {
    setUserIdFromToken(token);
  }, [token]);
  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
