import React, { useState } from "react";
import { RxCaretRight, RxCaretDown } from "react-icons/rx";
export default function Accordian({
  title,
  children,
  titleClass,
  open,
  accordianClass,
}) {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <div className={`box-content ${accordianClass}`}>
      <a
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center align-middle justify-between  bg-accordian"
      >
        <h2 className={`${titleClass}`}>{title}</h2>
        {isOpen ? (
          <RxCaretDown className="text-xl" />
        ) : (
          <RxCaretRight className="text-xl" />
        )}
      </a>
      {isOpen && <div className="overflow-auto">{children}</div>}
    </div>
  );
}
