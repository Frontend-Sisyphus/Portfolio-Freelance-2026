import React from 'react';

import "@/styles/entities/tool.css";

export default function Tool({title, icon, progress}) {
  return (
    <div className="tool">
      <div className="tool-top">
        {icon}

        <div>
          <p className="tool-top-title">{title}</p>
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
