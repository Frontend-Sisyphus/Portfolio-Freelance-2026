"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { headerTextLinks } from "@/data/headerTextLinks";

interface ViewContextValue {
  sectionInView: string;
  setSectionInView: React.Dispatch<React.SetStateAction<string>>;
}

const ViewContext = createContext<ViewContextValue | undefined>(undefined);

const SECTION_IDS = headerTextLinks.map((link) => link.id);
const PROBE_OFFSET = 96;

const ViewProvider: React.FC<{ children: any }> = ({ children }) => {
  const [sectionInView, setSectionInView] = useState(SECTION_IDS[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      let current = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= PROBE_OFFSET) {
          current = id;
        }
      }

      setSectionInView((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", update);
    };
  }, []);

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
