"use client";
import React from "react";

import { initialBlobityOptions } from "@/utils/blobity.config";

import useBlobity from "blobity/lib/react/useBlobity";

const Cursor = () => {
  const blobity = useBlobity(initialBlobityOptions);

  return <div />;
};

export default Cursor;