import React from "react";

const Heading = ({ text }) => {
  return (
    <h2 className="text-(--text-gold) text-2xl md:text-4xl underline font-cursive">
      {text}
    </h2>
  );
};

export default Heading;
