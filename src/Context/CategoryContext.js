import React, { createContext, useState } from "react";

const ContextCategory = createContext();

function CategoryProvider({ children }) {
  const [category, setCategory] = useState([]);
  return (
    <ContextCategory.Provider
      value={{
        category,
        setCategory,
      }}
    >
      {children}
    </ContextCategory.Provider>
  );
}

export { ContextCategory, CategoryProvider };
