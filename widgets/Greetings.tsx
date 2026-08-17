"use client";
import React, { useMemo, useRef } from "react";

import { useLocale, useTranslations } from "next-intl";

import { useLoader } from "@/context/LoaderProvider";

import {
  easeOut,
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import Image from "next/image";
import Link from "next/link";

import { getIntlArray } from "@/utils/generalFunctions";

import { greetingsIcons } from "@/data/greetingsIcons";
import OccupationsTypewriter from "@/shared/OccupationsTypewriter";

import "@/styles/widgets/greetings.css";

const Greetings = () => {
  const { isReady } = useLoader();

  const locale = useLocale();

  const t = useTranslations("greetings");

  const greetingsRef = useRef(null);
  const imgRef = useRef(null);
  const occupations = useMemo(() => getIntlArray(t("occupations")), [locale, t]);

  const animateIn1 = {
    opacity: [0, 1],
    y: ["1rem", "0px"],
    transition: {
      delay: 0.15,
      duration: 0.7,
      ease: easeOut,
    },
  };

  const animateIn2 = {
    ...animateIn1,
    transition: {
      ...animateIn1.transition,
      delay: 0.35,
    },
  };

  const animateIn3 = {
    ...animateIn1,
    transition: {
      ...animateIn1.transition,
      delay: 0.55,
    },
  };

  const { scrollYProgress } = useScroll({
    target: imgRef,
  });

  const imgRotate = useTransform(scrollYProgress, [0, 1], ["6deg", "-8deg"]);

  return (
    <section id="home" ref={greetingsRef} className="greetings">
      <div className="greetings-textBlock">
        <div className="greetings-status">
          <p className="greetings-status-item">
            <span>status</span>
            <span>{t("statusAvailable")}</span>
          </p>
          <p className="greetings-status-item">
            <span>loc</span>
            <span>{t("statusLocation")}</span>
          </p>
          <p className="greetings-status-item">
            <span>utc</span>
            <span>+3</span>
          </p>
        </div>

        <span className="greetings-textBlock-content">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="greetings-textBlock-startText"
          >
            // {t('startText')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={isReady ? animateIn1 : { opacity: 0 }}
            className="greetings-textBlock-title"
          >
            <b>{t('title')}</b>
            <br />
            {isReady ? (
              <OccupationsTypewriter strings={occupations} />
            ) : (
              <span className="greetings-textBlock-occupation">&nbsp;</span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isReady ? animateIn2 : { opacity: 0 }}
            className="greetings-textBlock-description"
          >
            {t('description')}
          </motion.p>
        </span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? animateIn3 : { opacity: 0 }}
          className="greetings-textBlock-statistics"
        >
          <div className="greetings-textBlock-statistics-item">
            <p className="greetings-textBlock-statistics-item-index">01</p>
            <p className="greetings-textBlock-statistics-item-number">2+</p>
            <p className="greetings-textBlock-statistics-item-text">{getIntlArray(t('statisticsText'))[0]}</p>
          </div>

          <div className="greetings-textBlock-statistics-item">
            <p className="greetings-textBlock-statistics-item-index">02</p>
            <p className="greetings-textBlock-statistics-item-number">5+</p>
            <p className="greetings-textBlock-statistics-item-text">{getIntlArray(t('statisticsText'))[1]}</p>
          </div>

          <div className="greetings-textBlock-statistics-item">
            <p className="greetings-textBlock-statistics-item-index">03</p>
            <p className="greetings-textBlock-statistics-item-number">7+</p>
            <p className="greetings-textBlock-statistics-item-text">{getIntlArray(t('statisticsText'))[2]}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? animateIn3 : { opacity: 0 }}
          className="greetings-textBlock-buttonsContainer"
        >
          <motion.a
            href="/#contacts"
            className="greetings-textBlock-buttonsContainer-contactButton"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.333.917H3.667A3.677 3.677 0 0 0 0 4.583v9.167a3.677 3.677 0 0 0 3.667 3.667v2.75c0 .825 1.008 1.191 1.558.641l3.392-3.391h9.716A3.677 3.677 0 0 0 22 13.75V4.583A3.677 3.677 0 0 0 18.333.917m-5.5 11h-5.5c-.55 0-.916-.367-.916-.917s.366-.917.916-.917h5.5c.55 0 .917.367.917.917s-.367.917-.917.917m1.834-3.667H7.333c-.55 0-.916-.367-.916-.917s.366-.916.916-.916h7.334c.55 0 .916.366.916.916s-.366.917-.916.917"
              />
            </svg>

            <p className="greetings-textBlock-buttonsContainer-contactButton-text">
              {t('contactButtonText')}
            </p>
          </motion.a>

          <motion.a
            href={locale === "ru" ? "/static/frontend-sisyphus-cv-ru.pdf" : "/static/frontend-sisyphus-cv.pdf"}
            target="blank"
            className="greetings-textBlock-buttonsContainer-downloadCVButton"
          >
            <p className="greetings-textBlock-buttonsContainer-downloadCVButton-text">
              {t('cvButtonText')}
            </p>
          </motion.a>
        </motion.div>

        <div className="greetings-textBlock-iconsContainer">
          {greetingsIcons.map((icon) => (
            <Link 
              key={icon.id} 
              href={icon.path} 
              data-blobity-magnetic="false" 
              className="greetings-textBlock-iconsContainer-icon"
            >
              {icon.component}
            </Link>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isReady ? animateIn1 : { opacity: 0 }}
        className="greetings-portraitWrap"
      >
        <motion.div ref={imgRef} style={{ rotate: imgRotate }} className="greetings-portrait">
          <Image
            src="/static/profile-picture.png"
            alt={t("title")}
            fill
            priority
            sizes="(max-width: 768px) 280px, 380px"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Greetings;