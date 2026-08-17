"use client";
import React, { useState } from "react";

import { useTranslations } from "next-intl";

import Workplace from "@/entities/Workplace";

import "@/styles/entities/experienceTrack.css";

type TrackKind = "work" | "education";

type TrackItem = {
  id: string;
  type: TrackKind;
  year: string;
  logo: string;
  sourceIndex: number;
};

type ExperienceTrackProps = {
  kind: TrackKind;
  items: TrackItem[];
};

const ExperienceTrack: React.FC<ExperienceTrackProps> = ({ kind, items }) => {
  const t = useTranslations("work");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`experienceTrack experienceTrack--${kind}`}>
      <div className="experienceTrack-head">
        <p className="experienceTrack-head-meta">
          // {kind === "work" ? t("workTrackMeta") : t("educationTrackMeta")}
        </p>
        <div className="experienceTrack-head-row">
          <h3 className="experienceTrack-head-title">
            {kind === "work" ? t("workTrack") : t("educationTrack")}
          </h3>
          <p className="experienceTrack-head-count">
            {String(items.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <ol className="experienceTrack-list">
        {items.map((item, index) => (
          <Workplace
            key={item.id}
            kind={kind}
            year={item.year}
            logo={item.logo}
            sourceIndex={item.sourceIndex}
            localIndex={index}
            isActive={activeIndex === index}
            onToggle={() =>
              setActiveIndex((current) => (current === index ? -1 : index))
            }
          />
        ))}
      </ol>
    </div>
  );
};

export default ExperienceTrack;
