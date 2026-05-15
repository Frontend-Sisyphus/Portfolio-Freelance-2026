"use client";
import React, { useRef, useEffect } from "react";

import { useTranslations } from 'next-intl';

import {
  useInView,
} from "framer-motion";

import { useView } from "@/context/ViewProvider";

import { tools } from '@/data/tools';

import ToolBlock from "@/widgets/ToolBlock";

import AnimatedTitle from '@/shared/AnimatedTitle';

import '@/styles/widgets/tools.css';

export default function Tools() {
  const t = useTranslations('tools');

  const { setSectionInView } = useView();

  const toolsRef = useRef(null);

  const isInView = useInView(toolsRef);

  useEffect(() => {
    if (isInView) {
      setSectionInView("инструменты");
    }
  }, [isInView]);
  return (
    <section id="tools" ref={toolsRef} className="tools">
      <AnimatedTitle
        type={2}
        text={t('title')}
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <div className="tools-container">
        <ToolBlock 
          index={0} 
          tools={tools.filter(tool => tool.type === "language")}
        />

        <ToolBlock 
          index={1} 
          tools={tools.filter(tool => tool.type === "framework" || tool.type === "library")}
        />

        <ToolBlock 
          index={2} 
          tools={tools.filter(tool => tool.type === "stateManager")}
        />

        <ToolBlock 
          index={3} 
          tools={tools.filter(tool => tool.type === "style")}
        />

        <ToolBlock 
          index={4} 
          tools={tools.filter(tool => tool.type === "application")}
        />
      </div>
    </section>
  )
}
