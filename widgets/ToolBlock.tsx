"use client";
import React, { useRef } from 'react';

import { useTranslations } from 'next-intl';

import {
  useInView,
} from "framer-motion";

import { getIntlArray } from '@/utils/generalFunctions';

import Tool from '@/entities/Tool';

import "@/styles/widgets/toolBlock.css";

interface Tool {
  id: string;
  type: string;
  title: string;
  icon: React.ReactElement;
  progress: number;
}

interface ToolBlock {
  index: number;
  tools: Tool[];
}

export default function ToolBlock({index, tools}: ToolBlock) {
  const t = useTranslations('tools');

  const toolBlockRef = useRef(null);

  const isInView = useInView(toolBlockRef, { once: true });

  return (
    <div ref={toolBlockRef} className={`toolBlock ${isInView ? "translate-y-0 opacity-100" : "translate-y-[16px] opacity-0"}`}>
      <div className="toolBlock-top">
        <hr/>

        <h4 className="toolBlock-top-title">{getIntlArray(t('blockTitles'))[index]}</h4>

        <hr/>
      </div>
      
      <div className="toolBlock-content">
        {tools.map(tool => 
          <Tool 
            key={tool.id}
            title={tool.title} 
            icon={tool.icon} 
            progress={tool.progress}
          />
        )}
      </div>
    </div>
  )
}
