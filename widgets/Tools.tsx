"use client";
import { useTranslations } from 'next-intl';

import { getIntlArray } from '@/utils/generalFunctions';

import { tools } from '@/data/tools';

import Tool from '@/entities/Tool';

import AnimatedTitle from '@/shared/AnimatedTitle';

import '@/styles/widgets/tools.css';

export default function Tools() {
  const t = useTranslations('tools');

  return (
    <section id="tools" className="tools">
      <AnimatedTitle
        type={2}
        text={t('title')}
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <div className="tools-container">
        <div className="tools-container-top">
          <hr/>

          <h4 className="tools-container-top-title">{getIntlArray(t('blockTitles'))[0]}</h4>

          <hr/>
        </div>

        <div className="tools-container-content">
          {tools.filter(tool => tool.type === "language").map(tool => 
            <Tool 
              key={tool.id}
              title={tool.title} 
              icon={tool.icon} 
              progress={tool.progress}
            />
          )}
        </div>

        <div className="tools-container-top">
          <hr/>

          <h4 className="tools-container-top-title">{getIntlArray(t('blockTitles'))[1]}</h4>

          <hr/>
        </div>

        <div className="tools-container-content">
          {tools.filter(tool => tool.type === "framework" || tool.type === "library").map(tool => 
            <Tool 
              key={tool.id}
              title={tool.title} 
              icon={tool.icon} 
              progress={tool.progress}
            />
          )}
        </div>

        <div className="tools-container-top">
          <hr/>

          <h4 className="tools-container-top-title">{getIntlArray(t('blockTitles'))[2]}</h4>

          <hr/>
        </div>

        <div className="tools-container-content">
          {tools.filter(tool => tool.type === "stateManager").map(tool => 
            <Tool 
              key={tool.id}
              title={tool.title} 
              icon={tool.icon} 
              progress={tool.progress}
            />
          )}
        </div>

        <div className="tools-container-top">
          <hr/>

          <h4 className="tools-container-top-title">{getIntlArray(t('blockTitles'))[3]}</h4>

          <hr/>
        </div>

        <div className="tools-container-content">
          {tools.filter(tool => tool.type === "style").map(tool => 
            <Tool 
              key={tool.id}
              title={tool.title} 
              icon={tool.icon} 
              progress={tool.progress}
            />
          )}
        </div>

        <div className="tools-container-top">
          <hr/>

          <h4 className="tools-container-top-title">{getIntlArray(t('blockTitles'))[4]}</h4>

          <hr/>
        </div>

        <div className="tools-container-content">
          {tools.filter(tool => tool.type === "application").map(tool => 
            <Tool 
              key={tool.id}
              title={tool.title} 
              icon={tool.icon} 
              progress={tool.progress}
            />
          )}
        </div>
      </div>
    </section>
  )
}
