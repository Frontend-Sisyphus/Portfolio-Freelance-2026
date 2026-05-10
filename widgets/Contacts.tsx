"use client";
import React, { useEffect, useRef, useState } from "react";

import { useInView } from "framer-motion";

import { useView } from "@/context/ViewProvider";

import { greetingsIcons } from "@/data/greetingsIcons";

import { AnimatePresence, motion } from "framer-motion";

import { Briefcase, Clock, Compass, Copy } from "@deemlol/next-icons";

import Link from "next/link";

import ContactsForm from "@/features/ContactsForm";

import AnimatedTitle from "@/shared/AnimatedTitle";

import "@/styles/widgets/contacts.css";

const Contacts = () => {
  const { setSectionInView } = useView();

  const contactsRef = useRef(null);
  const buttonRef = useRef(null);

  const isInView = useInView(contactsRef);
  const isButtonInView = useInView(buttonRef, { once: true });

  const [isFormOpened, changeIsFormOpened] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    if (isInView) {
      setSectionInView("контакты");
    }
  }, [isInView]);
  return (
    <>
      <section id="contacts" ref={contactsRef} className="contacts">
        <AnimatedTitle
          type={3}
          text="Хотите связаться со мной?"
          className="contacts-title"
          wordSpace="mr-[12px]"
          charSpace="mr-[0.5px]"
        />

        <ContactsForm/>

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            exit={{ opacity: 0 }}
            className="contacts-connectInfo"
          >
            <h4 className="contacts-connectInfo-title">Буду рад с вами пообщаться</h4>

            <p className="contacts-connectInfo-description">
              В настоящий момент я открыт для новых возможностей. Если у вас есть вопрос, 
              идея проекта или просто хотите поздороваться — не стесняйтесь обращаться ко 
              мне
            </p>

            <div className="contacts-connectInfo-points">
              <div className="contacts-connectInfo-points-item">
                <Briefcase size={24} color="#FFFFFF" strokeWidth={1.5} />

                <p className="contacts-connectInfo-points-item-text">Доступен для работы на фрилансе и полного рабочего дня</p>
              </div>

              <div className="contacts-connectInfo-points-item">
                <Clock size={24} color="#FFFFFF" strokeWidth={1.5} />

                <p className="contacts-connectInfo-points-item-text">Обычно отвечаю в течении одного дня</p>
              </div>

              <div className="contacts-connectInfo-points-item">
                <Compass size={24} color="#FFFFFF" strokeWidth={1.5} />

                <p className="contacts-connectInfo-points-item-text">Россия, Москва</p>
              </div>
            </div>

            <div className="contacts-connectInfo-email">
              <p className="contacts-connectInfo-email-title">Email</p>

              <div className="contacts-connectInfo-email-content">
                <p className="contacts-connectInfo-email-content-text">b03246599@gmail.com</p>

                <button 
                  data-blobity-magnetic="false"
                  data-blobity-radius="10px"
                  onClick={() => copyToClipboard("b03246599@gmail.com")}
                  className="contacts-connectInfo-email-content-button"
                >
                  <Copy size={18} color="#FFFFFF" strokeWidth={1.5} />

                  <p>Скопировать</p>
                </button>
              </div>
            </div>

            <div className="contacts-connectInfo-iconsContainer">
              {greetingsIcons.map((icon) => (
                <Link 
                  key={icon.id} 
                  href={icon.path} 
                  data-blobity-magnetic="false" 
                  data-blobity-radius="10px"
                  className="contacts-connectInfo-iconsContainer-icon"
                >
                  {icon.component}
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
};

export default Contacts;