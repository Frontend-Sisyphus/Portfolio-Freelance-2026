"use client";
import React from "react";

import { useTranslations } from "next-intl";

import { getIntlArray } from "@/utils/generalFunctions";

import { aboutParagraphs } from "@/data/aboutParagraphs";

import AnimatedTitle from "@/shared/AnimatedTitle";
import AnimatedParagraph from "@/shared/AnimatedParagraph";
import SectionMeta from "@/shared/SectionMeta";

import "@/styles/widgets/about.css";

const About = () => {
  const t = useTranslations('about');

  return (
    <section id="about" className="about">
      <SectionMeta index="01" label={t("meta")} />

      <AnimatedTitle
        type={2}
        text={t('title')}
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <div className="about-info">
        <div className="about-info-story">
          {aboutParagraphs.map((paragraph, index) => (
            <AnimatedParagraph key={paragraph.id}>
              {getIntlArray(t('paragraphs'))[index]}
            </AnimatedParagraph>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;