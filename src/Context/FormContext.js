import React, { createContext, useState } from "react";

const ContextForm = createContext();

function FormProvider({ children }, former ) {

  const [form, setForm] = useState(former);

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
