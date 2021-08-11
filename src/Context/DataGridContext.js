import React, { createContext, useState } from "react";

const ContextDataGrid = createContext();

function DataGridProvider({ children }) {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <ContextDataGrid.Provider
      value={{
        rows,
        setRows,
        selectedRows,
        setSelectedRows
      }}
    >
      {children}
    </ContextDataGrid.Provider>
  );
}

export { ContextDataGrid, DataGridProvider };
