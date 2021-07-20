import React, { createContext, useState } from "react";

const ContextDataGrid = createContext();

function DataGridProvider({ children }) {
  const [rows, setRows] = useState([]);
  return (
    <ContextDataGrid.Provider
      value={{
        rows,
        setRows,
      }}
    >
      {children}
    </ContextDataGrid.Provider>
  );
}

export { ContextDataGrid, DataGridProvider };
