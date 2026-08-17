"use client";
import React, { useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

import { useLoader } from "@/context/LoaderProvider";

import "@/styles/widgets/pageLoader.css";

type LoaderStage = "loading" | "span" | "full" | "gone";

const ease = [0.76, 0, 0.24, 1] as const;

const countPercent = (
  duration: number,
  onUpdate: (value: number) => void,
  onDone: () => void
) => {
  const startedAt = performance.now();
  let frameId = 0;

  const tick = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - (1 - progress) * (1 - progress);

    onUpdate(Math.round(eased * 100));

    if (progress < 1) {
      frameId = requestAnimationFrame(tick);
      return;
    }

    onDone();
  };

  frameId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frameId);
};

const PlusField = () => {
  const pluses = useMemo(
    () => Array.from({ length: 48 }, (_, index) => index),
    []
  );

  return (
    <div className="pageLoader-pluses" aria-hidden="true">
      {pluses.map((index) => (
        <span
          key={index}
          className="pageLoader-plus"
          style={{ animationDelay: `${(index % 8) * 0.08 + Math.floor(index / 8) * 0.06}s` }}
        >
          +
        </span>
      ))}
    </div>
  );
};

const PageLoader = () => {
  const t = useTranslations("loader");
  const { setIsReady } = useLoader();

  const [percents, setPercents] = useState([0, 0, 0]);
  const [stage, setStage] = useState<LoaderStage>("loading");

  useEffect(() => {
    document.documentElement.classList.add("is-loading");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const timeoutId = window.setTimeout(() => {
        setStage("gone");
        setIsReady(true);
        document.documentElement.classList.remove("is-loading");
      }, 120);

      return () => {
        window.clearTimeout(timeoutId);
        document.documentElement.classList.remove("is-loading");
      };
    }

    const timers: number[] = [];
    const stops = [
      countPercent(900, (value) => {
        setPercents((prev) => [value, prev[1], prev[2]]);
      }, () => {}),
      countPercent(1100, (value) => {
        setPercents((prev) => [prev[0], value, prev[2]]);
      }, () => {}),
      countPercent(1000, (value) => {
        setPercents((prev) => [prev[0], prev[1], value]);
      }, () => {}),
    ];

    timers.push(
      window.setTimeout(() => {
        setPercents([100, 100, 100]);
        setStage("span");
      }, 1150)
    );

    timers.push(
      window.setTimeout(() => {
        setStage("full");
      }, 1550)
    );

    timers.push(
      window.setTimeout(() => {
        setStage("gone");
        setIsReady(true);
        document.documentElement.classList.remove("is-loading");
      }, 2100)
    );

    return () => {
      stops.forEach((stop) => stop());
      timers.forEach((id) => window.clearTimeout(id));
      document.documentElement.classList.remove("is-loading");
    };
  }, [setIsReady]);

  const brandFrame =
    stage === "loading"
      ? { top: "0%", left: "0%", width: "50%", height: "50%" }
      : stage === "span"
        ? { top: "0%", left: "0%", width: "100%", height: "50%" }
        : { top: "0%", left: "0%", width: "100%", height: "100%" };

  const blocks = [
    { index: "01", label: t("blockOne"), percent: percents[0], position: "pageLoader-block--tr" },
    { index: "02", label: t("blockTwo"), percent: percents[1], position: "pageLoader-block--bl" },
    { index: "03", label: t("blockThree"), percent: percents[2], position: "pageLoader-block--br" },
  ];

  return (
    <AnimatePresence>
      {stage !== "gone" && (
        <motion.div
          className="pageLoader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {blocks.map((block) => (
            <div key={block.index} className={`pageLoader-block ${block.position}`}>
              <div className="pageLoader-block-top">
                <p>// {block.index}</p>
                <p>{block.label}</p>
              </div>
              <p className="pageLoader-block-percent">{block.percent}%</p>
            </div>
          ))}

          <motion.div
            className="pageLoader-brandBlock"
            initial={false}
            animate={brandFrame}
            transition={{ duration: 0.85, ease }}
          >
            <PlusField />

            <div className="pageLoader-brandBlock-content">
              <p className="pageLoader-brandBlock-tag">{t("brand")}</p>
              <p className="pageLoader-brandBlock-title">{t("siteName")}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
