"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [totalPriceCart, setTotalPriceCart] = useState(0);
  const [updateQuery, setUpdateQuery] = useState("");
  const [useId, setUseId] = useState("");
  const [uniqueUpdate, setUniqueUpdate] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        activeLink,
        setActiveLink,
        totalPriceCart,
        setTotalPriceCart,
        updateQuery,
        setUpdateQuery,
        uniqueUpdate,
        setUniqueUpdate,
        useId,
        setUseId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
