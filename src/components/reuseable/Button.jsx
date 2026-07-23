import React from "react";

const Button = ({ text, className, type, onClick, analyticsEvent }) => {
  const handleClick = (event) => {
    if (analyticsEvent && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", analyticsEvent, {
        page: window.location.pathname,
      });
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={`bg-(--bg-gold) text-(--text-cream) cursor-pointer py-2 px-6 rounded-full hover:bg-(--bg-gold)/80 transition ${className}`}
      type={type ? type : "button"}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
