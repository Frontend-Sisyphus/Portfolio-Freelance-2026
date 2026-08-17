import React from "react";

import Header from "@/widgets/TheHeader";
import MobileHeader from "@/widgets/MobileHeader";
import Footer from "@/widgets/TheFooter";

import Cursor from "@/entities/Cursor";
import PageLoader from "@/widgets/PageLoader";

const ThePageWrapper: React.FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <PageLoader />

      <Header />

      <MobileHeader />

      <Cursor />

      {children}

      <Footer />
    </>
  );
};

export default ThePageWrapper;