"use client";

import { useEffect } from "react";

import { CustomCursor } from "@/utils/customCursor";
import { initialCursorOptions } from "@/utils/cursor.config";

const Cursor = () => {
  useEffect(() => {
    const cursor = new CustomCursor(initialCursorOptions);

    return () => {
      cursor.destroy();
    };
  }, []);

  return null;
};

export default Cursor;
