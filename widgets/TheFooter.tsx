"use client";
import React, { useState } from "react";

import "@/styles/widgets/footer.css";

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <span className="footer-textBlock">
        <p className="footer-textBlock-copyright">&copy;</p>{" "}
        {currentDate.getFullYear()} / Борис Карабут / ВСЕ ПРАВА ЗАЩИЩЕНЫ
      </span>

      <button
        onClick={scrollToTop}
        data-blobity-radius="5"
        className="footer-scrollButton"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.061 0 2.72 8.342a1.77 1.77 0 0 0 0 2.506 1.77 1.77 0 0 0 2.506 0l4.063-4.064v13.444a1.772 1.772 0 1 0 3.545 0V6.784l4.063 4.064a1.77 1.77 0 0 0 2.506-.001 1.77 1.77 0 0 0 0-2.505z"
            fill="#e4e9ff"
          />
        </svg>

        <p>Наверх</p>
      </button>
    </footer>
  );
};

export default Footer;