"use client";
import React, { useEffect, useRef } from "react";

import { useInView } from "framer-motion";

import { useView } from "@/context/ViewProvider";

import { workplaces } from "@/data/workplaces";

import Timeline from "@/entities/Timeline";
import Workplace from "@/entities/Workplace";

import AnimatedTitle from "@/shared/AnimatedTitle";
import AnimatedParagraph from "@/shared/AnimatedParagraph";

import "@/styles/widgets/work.css";

const Work = () => {
  const { setSectionInView } = useView();

  const workRef = useRef(null);

  const isInView = useInView(workRef);

  useEffect(() => {
    if (isInView) {
      setSectionInView("работа");
    }
  }, [isInView]);
  return (
    <section id="work" ref={workRef} className="work">
      <div className="work-top">
        <AnimatedTitle
          type={2}
          text="Опыт работы и образование"
          className="sectionTitle"
          wordSpace="mr-[14px]"
          charSpace="mr-[0.5px]"
        />

        <AnimatedParagraph className="work-top-yearsCount">
          2 года
        </AnimatedParagraph>
      </div>

      <div className="work-experience">
        <Timeline />

        <div className="work-experience-container">
          {workplaces.map((workplace) => (
            <Workplace
              key={workplace.id}
              logo={workplace.logo}
              occupation={workplace.occupation}
              companyName={workplace.companyName}
              timeGap={workplace.timeGap}
              results={workplace.results}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;