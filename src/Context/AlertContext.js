import React, { createContext, useState } from "react";
import { emptyAlertState } from "../common/EmptyStates";

const ContextAlert = createContext();

function AlertProvider({ children }) {

  const [alert, setAlert] = useState(emptyAlertState);
  return (
    <ContextAlert.Provider
      value={{
        alert,
        setAlert,
      }}
    >
      {children}
    </ContextAlert.Provider>
  );
}

export { ContextAlert, AlertProvider };
