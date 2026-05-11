import { tools } from '@/data/tools';

import Tool from '@/entities/Tool';

import AnimatedTitle from '@/shared/AnimatedTitle';

import '@/styles/widgets/tools.css';

export default function Tools() {
  return (
    <section className="tools">
      <AnimatedTitle
        type={2}
        text="Инструменты"
        className="sectionTitle"
        wordSpace="mr-[14px]"
        charSpace="mr-[0.5px]"
      />

      <div className="tools-container">
        <div className="tools-container-top">
          <hr/>

          <h4 className="tools-container-top-title">Языки программирования</h4>

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

          <h4 className="tools-container-top-title">Фреймворки и библиотеки</h4>

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

          <h4 className="tools-container-top-title">Управление состоянием</h4>

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

          <h4 className="tools-container-top-title">Стилизация</h4>

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

          <h4 className="tools-container-top-title">Приложения</h4>

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
