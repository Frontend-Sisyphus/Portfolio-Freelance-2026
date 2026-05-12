"use client";
import React, { useEffect, useRef } from "react";

import { useTranslations } from "next-intl";

import { useInView } from "framer-motion";

import { useView } from "@/context/ViewProvider";

import { getIntlArray } from "@/utils/generalFunctions";

import { aboutParagraphs } from "@/data/aboutParagraphs";

import AnimatedTitle from "@/shared/AnimatedTitle";
import AnimatedParagraph from "@/shared/AnimatedParagraph";

import "@/styles/widgets/about.css";

const About = () => {
  const t = useTranslations('about');
  const { setSectionInView } = useView();

  const aboutRef = useRef(null);

  const isInView = useInView(aboutRef);

  useEffect(() => {
    if (isInView) {
      setSectionInView("обо мне");
    }
  }, [isInView]);
  return (
    <section id="about" ref={aboutRef} className="about">
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