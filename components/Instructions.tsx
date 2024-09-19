"use client";

import { useState } from "react";

const Instructions = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={
        (isOpen ? "flex" : "hidden") +
        ` absolute top-0 left-0 w-screen h-screen items-center justify-center bg-black/35`
      }
    >
      <div className="w-full max-w-[512px] bg-background-200 px-6 py-6 rounded-xl">
        <p>Ola</p>
      </div>
    </div>
  );
};

export default Instructions;
