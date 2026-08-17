"use client";

import { useEffect } from "react";

import { CustomCursor } from "@/utils/customCursor";
import { initialCursorOptions } from "@/utils/cursor.config";
import { useLoader } from "@/context/LoaderProvider";

const Cursor = () => {
  const { isReady } = useLoader();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canHover) {
      return;
    }

    const cursor = new CustomCursor(initialCursorOptions);

    return () => {
      cursor.destroy();
    };
  }, [isReady]);

  return null;
};

export default Cursor;
