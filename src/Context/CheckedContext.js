import React, { createContext, useState } from "react";
import { emptyChecked } from "../common/EmptyStates";

const ContextChecked = createContext();

function CheckedProvider({ children }) {
  const [stateCheckedDespesas, setStateCheckedDespesas] = useState(
    emptyChecked
  );
  const [stateCheckedReceitas, setStateCheckedReceitas] = useState(
    emptyChecked
  );

  return (
    <ContextChecked.Provider
      value={{
        stateCheckedDespesas,
        setStateCheckedDespesas,
        stateCheckedReceitas,
        setStateCheckedReceitas,
      }}
    >
      {children}
    </ContextChecked.Provider>
  );
}

export { ContextChecked, CheckedProvider };
