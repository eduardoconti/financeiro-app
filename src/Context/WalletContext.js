import React, { createContext, useState } from "react";

const ContextWallet = createContext();

function WalletProvider({ children }) {
  const [wallet, setWallet] = useState([]);
  return (
    <ContextWallet.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      {children}
    </ContextWallet.Provider>
  );
}

export { ContextWallet, WalletProvider };
