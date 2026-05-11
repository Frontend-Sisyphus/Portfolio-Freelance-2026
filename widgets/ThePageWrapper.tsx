import React from "react";

import Header from "@/widgets/TheHeader";
import MobileHeader from "@/widgets/MobileHeader";
import Footer from "@/widgets/TheFooter";

import Cursor from "@/entities/Cursor";

import StarBackground from "@/shared/StarBackground";

const ThePageWrapper: React.FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <Header />

      <MobileHeader />

      <Cursor />

      {children}

      <Footer />

      <StarBackground/>
    </>
  );
};

export default ThePageWrapper;