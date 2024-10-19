"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [activeLink, setActiveLink] = useState("dashboard");
  return (
    <GlobalContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </GlobalContext.Provider>
  );
}
