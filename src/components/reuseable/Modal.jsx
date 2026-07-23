import React from "react";

const Modal = ({ children, className }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-black/60">
      <div
        className={`bg-(--bg-cream) flex flex-col gap-7 p-10 rounded-lg shadow-(--bg-cream) w-[32vw] ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
