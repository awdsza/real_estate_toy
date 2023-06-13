import React from "react";
export default function DetailTitle({ title, children }) {
  return (
    <div className="box-content pr-2 relative">
      <a className="flex items-center align-middle justify-between bg-accordian">
        <h2 className="font-semibold text-xl">{title}</h2>
      </a>
      <div className="overflow-auto">{children}</div>
    </div>
  );
}
