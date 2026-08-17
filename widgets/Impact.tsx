"use client";
import React from "react";

import { useTranslations } from "next-intl";

import { impactItems } from "@/data/impact";

import AnimatedTitle from "@/shared/AnimatedTitle";
import SectionMeta from "@/shared/SectionMeta";

import "@/styles/widgets/impact.css";

export default function Impact() {
  const t = useTranslations("impact");

  return (
    <section id="impact" className="impact">
      <SectionMeta index="02" label={t("meta")} />

      <AnimatedTitle
        type={2}
        text={t("title")}
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <div className="impact-grid">
        {impactItems.map((item) => (
          <article key={item.id} className="impact-item">
            <p className="impact-item-index">// {item.index}</p>
            <p className="impact-item-value">
              {t(`items.${item.id}.value`)}
              <sup>*</sup>
            </p>
            <p className="impact-item-label">{t(`items.${item.id}.label`)}</p>
            <p className="impact-item-note">* {t("note")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
