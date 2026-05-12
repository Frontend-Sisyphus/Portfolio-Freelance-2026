"use client";
import React from 'react';

import { useTranslations } from 'next-intl';

import "@/styles/entities/tool.css";
import { getIntlArray } from '@/utils/generalFunctions';

interface ToolProps {
  title: string;
  icon: React.ReactNode;
  progress: number;
}

export default function Tool({title, icon, progress}: ToolProps) {
  const t = useTranslations('tools');

  const getClassColor = (progress: number) => {
    if(progress >= 80) {
      return "#f0743b";
    } else if (progress >= 50 && progress < 80) {
      return "#5ca6f8";
    } else if (progress >= 30 && progress < 50) {
      return "#60cb78";
    } else {
      return "#626365";
    }
  }

  const getClassText = (progress: number) => {
    if(progress >= 80) {
      return getIntlArray(t('classNames'))[0];
    } else if (progress >= 50 && progress < 80) {
      return getIntlArray(t('classNames'))[1];
    } else if (progress >= 30 && progress < 50) {
      return getIntlArray(t('classNames'))[2];
    } else {
      return getIntlArray(t('classNames'))[3];
    }
  }
  return (
    <div className="tool">
      <div className="tool-top">
        {icon}

        <div className="tool-top-right">
          <p className="tool-top-right-title">{title}</p>

          <div className="tool-top-right-class">
            <div style={{ backgroundColor: getClassColor(progress)}} className="tool-top-right-class-circle"/>

            <p style={{ color: getClassColor(progress)}} className="tool-top-right-class-title">{getClassText(progress)}</p>
          </div>
        </div>
      </div>

      <div className="tool-bottom">
        <div className="tool-bottom-progress">
          <div style={{width: `${progress}%`}} className="tool-bottom-progress-percentage"/>
        </div>

        <p className="tool-bottom-percentage">{progress}%</p>
      </div>
    </div>
  )
}
