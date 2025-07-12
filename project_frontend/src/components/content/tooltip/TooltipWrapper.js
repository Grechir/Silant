import React from "react";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import './TooltipWrapperAnimations.css';

export default function TooltipWrapper({ tooltipText, children }) {
  const tooltipContent = (
    <div className="customTooltip">
      {tooltipText}
    </div>
  );

  return (
    <Tippy
      content={tooltipContent}
      placement="top"
      arrow={false}           // своя стрелка в content
      animation={false}       // чтобы анимация своя шла
      theme="custom"          // кастомная тема для сброса стилей
      interactive={false}
      delay={[100, 0]}
      offset={[0, 42]}
    >
      {/* span 100% ширины/высоты для всей ячейки */}
      <span style={{ display: "block", width: "100%", height: "100%" }}>
        {children}
      </span>
    </Tippy>
  );
}
