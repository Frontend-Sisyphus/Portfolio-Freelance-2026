import React from "react";

import Header from "@/widgets/TheHeader";
import MobileHeader from "@/widgets/MobileHeader";
import Footer from "@/widgets/TheFooter";

import Cursor from "@/entities/Cursor";

const ThePageWrapper: React.FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <Header />

      <MobileHeader />

      <Cursor />

      {children}

      <Footer />
    </>
  );
};

export default ThePageWrapper;