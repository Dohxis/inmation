import React from "react";

interface IPanel {
  title: string;
  span: number;
}

export const Panel: React.FC<IPanel> = ({ title, span, children }) => {
  return (
    <div
      className={`flex flex-col border border-inmation-dark col-span-${span} bg-inmation-light`}
    >
      <div className="bg-inmation-dark text-white p-2 uppercase tracking-wide text-lg font-light">
        {title}
      </div>
      <div className="text-white">{children}</div>
    </div>
  );
};
