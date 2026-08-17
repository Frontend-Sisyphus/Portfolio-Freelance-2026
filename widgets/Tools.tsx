"use client";
import React from "react";

import { useTranslations } from "next-intl";

import { practices } from "@/data/practices";

import AnimatedTitle from "@/shared/AnimatedTitle";
import AnimatedParagraph from "@/shared/AnimatedParagraph";
import SectionMeta from "@/shared/SectionMeta";

import "@/styles/widgets/tools.css";

export default function Tools() {
  const t = useTranslations("tools");

  return (
    <section id="tools" className="tools">
      <SectionMeta index="04" label={t("meta")} />

      <AnimatedTitle
        type={2}
        text={t("title")}
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <AnimatedParagraph className="tools-lead">{t("lead")}</AnimatedParagraph>

      <div className="tools-container">
        {practices.map((practice) => (
          <article key={practice.id} className="practice">
            <p className="practice-index">// {practice.index}</p>
            <h3 className="practice-title">{t(`items.${practice.id}.title`)}</h3>
            <p className="practice-text">{t(`items.${practice.id}.text`)}</p>
            <div className="practice-chips">
              {practice.chips.map((chip) => (
                <span key={`${practice.id}-${chip}`}>{chip}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
