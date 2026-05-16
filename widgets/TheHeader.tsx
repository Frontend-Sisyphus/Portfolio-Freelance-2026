"use client";
import { useRouter } from '@/i18n/navigation';

import { AnimatePresence, useScroll, motion } from "motion/react";

import { useTheme } from "next-themes";

import { useLocale, useTranslations } from 'next-intl';

import { useView } from "@/context/ViewProvider";

import { getIntlArray } from '@/utils/generalFunctions';

import { headerTextLinks } from "@/data/headerTextLinks";

import { Sun, Moon } from "@deemlol/next-icons";

import Link from "next/link";

import "@/styles/widgets/header.css";

const Header = () => {
  const { sectionInView } = useView();

  const t = useTranslations('header');

  const { theme, setTheme } = useTheme();

  const { scrollYProgress } = useScroll()

  const locale = useLocale();
  const router = useRouter();

  const toggle = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en';

    setTimeout(() => router.replace("/", { locale: newLocale }), 600);
  };
  return (
    <header className="header">
      <motion.div style={{ scaleX: scrollYProgress }} className="header-pageProgressLine"/>

      {/* Frontend Sisyphus logo */}
      <div className="header-left">
        <img src="/static/frontend-sisyphus-logo.png" alt="" className="header-left-logo"/>

        <hr className="header-left-divisionLine"/>

        <p className="header-left-text">Frontend Sisyphus</p>
      </div>  

      <div className="header-right">
        <nav className="header-right-nav">
          {headerTextLinks.map((textLink, index) => (
            <Link
              key={textLink.id}
              href={textLink.path}
              data-blobity-radius="10"
              className={
                sectionInView === textLink.label.toLowerCase()
                  ? "link-active"
                  : "link-inactive"
              }
            >
              {getIntlArray(t('links'))[index]}
            </Link>
          ))}
        </nav>

        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
          data-blobity-magnetic="false"
          data-blobity-radius="10"
          className="header-right-toggleThemeButton"
        >
          <AnimatePresence initial={false}>
            {theme === "dark" ? 
              <motion.div
                key="sun"
                initial={{ x: 0, y: -50, }}
                animate={{ x: 0, y: 0, }}
                exit={{ x: 0, y: -50, }}
                transition={{ duration: 0.4 }}
                className="header-right-toggleThemeButton-iconWrapper"
                suppressHydrationWarning
              >
                <Sun size={18} strokeWidth={1.5} />
              </motion.div>
              :
              <motion.div
                key="moon"
                initial={{ x: 0, y: 50, }}
                animate={{ x: 0, y: 0, }}
                exit={{ x: 0, y: 50, }}
                transition={{ duration: 0.4 }}
                className="header-right-toggleThemeButton-iconWrapper"
                suppressHydrationWarning
              >
                <Moon size={18} strokeWidth={1.5} />
              </motion.div>
            }
          </AnimatePresence>
        </button>

        <label className="header-right-languageToggler">
          <input type="checkbox" checked={locale === "ru" ? false : true} onChange={() => toggle()}/>

          <div className="header-right-languageToggler-slider"/>

          <p className={`header-right-languageToggler-ru ${locale === "ru" ? "lang-active" : "lang-inactive"}`}>ru</p>

          <p className={`header-right-languageToggler-en ${locale === "en" ? "lang-active" : "lang-inactive"}`}>en</p>
        </label>
      </div>
    </header>
  );
};

export default Header;