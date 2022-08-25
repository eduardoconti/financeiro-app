import React, { createContext, useState } from "react";

const ContextForm = createContext();

function FormProvider({ children }) {
  const [form, setForm] = useState({});

  return (
    <ContextForm.Provider
      value={{
        form,
        setForm,
      }}
    >
      {children}
    </ContextForm.Provider>
  );
}

export { ContextForm, FormProvider };
