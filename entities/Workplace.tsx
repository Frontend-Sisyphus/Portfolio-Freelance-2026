"use client";
import React, { useRef } from "react";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import "@/styles/entities/workplace.css";

type WorkplaceProps = {
  kind: "work" | "education";
  year: string;
  logo: string;
  sourceIndex: number;
  localIndex: number;
  isActive: boolean;
  onToggle: () => void;
};

const Workplace: React.FC<WorkplaceProps> = ({
  kind,
  year,
  logo,
  sourceIndex,
  localIndex,
  isActive,
  onToggle,
}) => {
  const t = useTranslations("work");
  const workplaces = t.raw("workplaces");
  const entry = workplaces[sourceIndex];

  const workplaceRef = useRef(null);
  const isInView = useInView(workplaceRef, { once: true, margin: "-80px" });

  return (
    <li
      ref={workplaceRef}
      className={`workplace workplace--${kind} ${isActive ? "is-active" : ""} ${
        isInView ? "is-visible" : ""
      }`}
    >
      <p className="workplace-year">{year}</p>

      <div className="workplace-rail" aria-hidden="true">
        <span className="workplace-rail-node" />
      </div>

      <article className="workplace-card">
        <div className="workplace-summary">
          <Image
            src={logo}
            alt=""
            width={56}
            height={56}
            className="workplace-summary-logo"
          />

          <div className="workplace-summary-copy">
            <p className="workplace-summary-index">
              {String(localIndex + 1).padStart(2, "0")}
            </p>
            <h4 className="workplace-summary-occupation">{entry.occupation}</h4>
            <p className="workplace-summary-company">{entry.companyName}</p>
            <p className="workplace-summary-time">{entry.timeGap}</p>
          </div>

          <button
            type="button"
            className="workplace-summary-toggle"
            onClick={onToggle}
            aria-expanded={isActive}
            data-blobity-magnetic="false"
          >
            {isActive ? t("collapseLabel") : t("expandLabel")}
            <i />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              className="workplace-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              <ol className="workplace-details-list">
                {entry.results.map((result: string, resultIndex: number) => (
                  <li key={`${sourceIndex}-${resultIndex}`}>
                    <span>{String(resultIndex + 1).padStart(2, "0")}</span>
                    <p>{result}</p>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </li>
  );
};

export default Workplace;
