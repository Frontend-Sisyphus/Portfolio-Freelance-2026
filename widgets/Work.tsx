"use client";
import React from "react";

import { useTranslations } from "next-intl";

import { workplaces } from "@/data/workplaces";

import ExperienceTrack from "@/entities/ExperienceTrack";

import AnimatedTitle from "@/shared/AnimatedTitle";
import AnimatedParagraph from "@/shared/AnimatedParagraph";
import SectionMeta from "@/shared/SectionMeta";

import "@/styles/widgets/work.css";

const Work = () => {
  const t = useTranslations("work");

  const items = workplaces.map((workplace, sourceIndex) => ({
    ...workplace,
    sourceIndex,
  }));

  const workItems = items.filter((item) => item.type === "work");
  const educationItems = items.filter((item) => item.type === "education");

  return (
    <section id="work" className="work">
      <SectionMeta index="03" label={t("meta")} />

      <div className="work-top">
        <AnimatedTitle
          type={2}
          text={t("title")}
          className="sectionTitle"
          wordSpace="mr-[14px]"
          charSpace="mr-[0.5px]"
        />

        <AnimatedParagraph className="work-top-yearsCount">
          {t("yearsCount")}
        </AnimatedParagraph>
      </div>

      <div className="work-tracks">
        <ExperienceTrack kind="work" items={workItems} />
        <ExperienceTrack kind="education" items={educationItems} />
      </div>
    </section>
  );
};

export default Work;
