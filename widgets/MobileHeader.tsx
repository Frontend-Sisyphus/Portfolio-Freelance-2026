"use client";
import React, { useEffect, useRef, useState } from "react";

import { useRouter } from '@/i18n/navigation';

import { useLocale, useTranslations } from 'next-intl';

import { useView } from "@/context/ViewProvider";

import { headerTextLinks } from "@/data/headerTextLinks";
import { greetingsIcons } from "@/data/greetingsIcons";

import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";

import "@/styles/widgets/mobileHeader.css";

const MobileHeader = () => {
  const t = useTranslations('header');

  const { sectionInView } = useView();

  const mobileHeaderRef = useRef(null) as any;
  const mobileMenuRef = useRef(null) as any;

  const [isMenuOpened, changeIsMenuOpened] = useState(false);

  const locale = useLocale();
  const router = useRouter();

  const toggle = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en';

    setTimeout(() => router.replace("/", { locale: newLocale }), 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      changeIsMenuOpened(false);
    };

    const handleOutsideClick = (event: any) => {
      if (
        mobileHeaderRef.current &&
        !mobileHeaderRef.current.contains(event.target as Node) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        changeIsMenuOpened(false);
      }
    };

    document.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <header ref={mobileHeaderRef} className="mobileHeader">
        {/* Boris Karabut logo*/}
        <img src="/static/frontend-sisyphus-logo.png" alt="" className="mobileHeader-logo"/>

        <button
          onClick={() => changeIsMenuOpened((prev) => !prev)}
          className="mobileHeader-hamburgerButton"
        >
          {isMenuOpened ? (
            <svg
              width="28"
              height="28"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m4.813 4.813 12.375 12.375m-12.375 0L17.188 4.813"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1m0 6h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1m0 6h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1"
                fill="#fff"
              />
            </svg>
          )}
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpened && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobileHeader-menu"
          >
            <nav className="mobileHeader-nav">
              {headerTextLinks.map((textLink) => (
                <Link
                  key={textLink.id}
                  href={textLink.path}
                  className={
                    sectionInView === textLink.label.toLowerCase()
                      ? "link-active"
                      : "link-inactive"
                  }
                >
                  {textLink.label}
                </Link>
              ))}
            </nav>

            <div className="mobileHeader-iconsContainer">
              {greetingsIcons.map((icon) => (
                <Link
                  key={icon.id}
                  href={icon.path}
                  data-blobity-magnetic="false"
                  className="mobileHeader-iconsContainer-item"
                >
                  {icon.component}
                </Link>
              ))}

              <label className="mobileHeader-languageToggler">
                <input type="checkbox" checked={true}/>

                <div className="mobileHeader-languageToggler-slider"/>

                <p className={`mobileHeader-languageToggler-ru ${locale === "ru" ? "lang-active" : "lang-inactive"}`}>{locale === "ru" ? "ru" : "en"}</p>

                <p className={`mobileHeader-languageToggler-en ${locale === "en" ? "lang-active" : "lang-inactive"}`}>{locale === "ru" ? "en" : "ru"}</p>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;