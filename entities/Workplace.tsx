"use client";
import React, { useRef } from "react";

import { useInView } from "framer-motion";

import "@/styles/entities/workplace.css";

interface WorkPlaceProps {
  logo: string;
  occupation: string;
  companyName: string;
  timeGap: string;
  results: {
    id: string;
    text: string;
  }[];
}

const Workplace: React.FC<WorkPlaceProps> = ({
  logo,
  occupation,
  companyName,
  timeGap,
  results,
}) => {
  const workplaceRef = useRef(null);

  const isInView = useInView(workplaceRef, { once: true });
  return (
    <div
      ref={workplaceRef}
      className={`workplace ${isInView ? "translate-y-0 opacity-100" : "translate-y-[16px] opacity-0"}`}
    >
      <img src={logo} alt="" className="workplace-image" />

      <div className="workplace-textContent">
        <h3 className="workplace-textContent-occupation">{occupation}</h3>

        <h4 className="workplace-textContent-company">{companyName}</h4>

        <p className="workplace-textContent-timeGap">{timeGap}</p>

        <ul className="workplace-textContent-results">
          {results.map((result) => (
            <li key={result.id}>{result.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Workplace;