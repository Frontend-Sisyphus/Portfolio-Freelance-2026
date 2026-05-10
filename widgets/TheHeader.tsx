"use client";
import { usePathname, useRouter } from '@/i18n/navigation';

import { AnimatePresence, motion } from "motion/react";

import { useTheme } from "next-themes";

import { useLocale } from 'next-intl';

import { useSearchParams } from 'next/navigation';

import { useView } from "@/context/ViewProvider";

import { headerTextLinks } from "@/data/headerTextLinks";

import { Sun } from "@deemlol/next-icons";
import { Moon } from "@deemlol/next-icons";

import Link from "next/link";

import "@/styles/widgets/header.css";

const Header = () => {
  const { sectionInView } = useView();

  const { theme, setTheme } = useTheme();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggle = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en';

    setTimeout(() => router.replace("/", { locale: newLocale }), 600);
  };

  // useEffect(() => {
  //   const browserLang = navigator.language;
  //
  //   localStorage.setItem("userBrowserLang", browserLang);
  //
  //   const locale = browserLang.slice(0, 2);
  //   localStorage.setItem("locale", locale);
  //
  //   console.log("Язык браузера сохранен в localStorage:", browserLang, locale);
  // }, []);
  return (
    <header className="header">
      {/* Frontend Sisyphus logo */}
      <div className="header-left">
        <img src="/static/frontend-sisyphus-logo.png" alt="" className="header-left-logo"/>

        <hr className="header-left-divisionLine"/>

        <p className="header-left-text">Frontend Sisyphus</p>
      </div>  

      <div className="header-right">
        <nav className="header-right-nav">
          {headerTextLinks.map((textLink) => (
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
              {textLink.label}
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
              >
                <Sun size={18} color="#FFFFFF" strokeWidth={1.5} />
              </motion.div>
              :
              <motion.div
                key="moon"
                initial={{ x: 0, y: 50, }}
                animate={{ x: 0, y: 0, }}
                exit={{ x: 0, y: 50, }}
                transition={{ duration: 0.4 }}
                className="header-right-toggleThemeButton-iconWrapper"
              >
                <Moon size={18} color="#FFFFFF" strokeWidth={1.5} />
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

      {/* <div className="header-icons">
        {headerIcons.map((icon) => (
          <Link key={icon.id} href={icon.path} data-blobity-magnetic="false">
            {icon.component}
          </Link>
        ))}
      </div> */}

      {/*<div className="header-languageBlock">*/}
      {/*  <button*/}
      {/*    data-blobity-radius="5"*/}
      {/*    data-blobity-magnetic="false"*/}
      {/*    className="header-languageBlock-text"*/}
      {/*  >*/}
      {/*    eng*/}
      {/*  </button>*/}

      {/*  <p className="header-languageBlock-text">/</p>*/}

      {/*  <button*/}
      {/*    data-blobity-radius="5"*/}
      {/*    data-blobity-magnetic="false"*/}
      {/*    className="header-languageBlock-text"*/}
      {/*  >*/}
      {/*    rus*/}
      {/*  </button>*/}
      {/*</div>*/}
    </header>
  );
};

export default Header;