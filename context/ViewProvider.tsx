"use client";
import React, { createContext, useContext, useState } from "react";

interface ViewContextValue {
  sectionInView: string;
  setSectionInView: React.Dispatch<React.SetStateAction<string>>;
}

const ViewContext = createContext<ViewContextValue | undefined>(undefined);

const ViewProvider: React.FC<{ children: any }> = ({ children }) => {
  const [sectionInView, setSectionInView] = useState("home");

  return (
    <ViewContext.Provider value={{ sectionInView, setSectionInView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;

const useView = () => {
  const context = useContext(ViewContext);

  if (context === undefined) throw new Error("ViewContext вне ViewProvider");

  return context;
};

export { ViewProvider, useView };