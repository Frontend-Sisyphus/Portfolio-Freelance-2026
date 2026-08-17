"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

interface LoaderContextValue {
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);

const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const value = useMemo(() => ({ isReady, setIsReady }), [isReady]);

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

const useLoader = () => {
  const context = useContext(LoaderContext);

  if (context === undefined) {
    throw new Error("useLoader must be used within LoaderProvider");
  }

  return context;
};

export { LoaderProvider, useLoader };
export default LoaderProvider;
