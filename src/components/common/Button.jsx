import React, { useState } from "react";

export default function Button({ title, clickFunc, isActive }) {
  const onClickEvt = (e) => {
    clickFunc(e);
  };
  return (
    <button
      className={`cursor-pointer w-15 h-5 box-content text-base font-medium 
      ${isActive ? "text-buttonColor " : "text-baseColor"}
      ${isActive ? "bg-button-baseColor " : "bg-white "}
      inline-block px-5 py-3 box-contenxt`}
      onClick={onClickEvt}
    >
      <span>{title}</span>
    </button>
  );
}
