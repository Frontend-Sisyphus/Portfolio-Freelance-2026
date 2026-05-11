"use client";
import React, { useEffect, useRef } from "react";

import { useInView } from "framer-motion";

import { useView } from "@/context/ViewProvider";

import { aboutParagraphs } from "@/data/aboutParagraphs";

import AnimatedTitle from "@/shared/AnimatedTitle";
import AnimatedParagraph from "@/shared/AnimatedParagraph";

import "@/styles/widgets/about.css";

const About = () => {
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
        text="Я делаю красивые и быстрые интерфейсы"
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <div className="about-info">
        <div className="about-info-story">
          {aboutParagraphs.map((paragraph) => (
            <AnimatedParagraph key={paragraph.id}>
              {paragraph.text}
            </AnimatedParagraph>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;