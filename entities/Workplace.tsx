"use client";
import React, { useRef } from "react";

import { useTranslations } from "next-intl";

import { useInView } from "framer-motion";

import "@/styles/entities/workplace.css";

interface WorkPlaceProps {
  logo: string;
  index: number;
}

const Workplace: React.FC<WorkPlaceProps> = ({
  logo,
  index,
}) => {
  const t = useTranslations('work');
  const workplaces = t.raw('workplaces');

  const workplaceRef = useRef(null);

  const isInView = useInView(workplaceRef, { once: true });
  return (
    <div
      ref={workplaceRef}
      className={`workplace ${isInView ? "translate-y-0 opacity-100" : "translate-y-[16px] opacity-0"}`}
    >
      <div className="workplace-top">
        <img src={logo} alt="" className="workplace-top-image" />

        <h3 className="workplace-top-occupation">{workplaces[index].occupation}</h3>
      </div>

      <div className="workplace-textContent">
        <h4 className="workplace-textContent-company">{workplaces[index].companyName}</h4>

        <p className="workplace-textContent-timeGap">{workplaces[index].timeGap}</p>

        <ul className="workplace-textContent-results">
          {workplaces[index].results.map((result: string) => (
            <li key={crypto.randomUUID()}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Workplace;