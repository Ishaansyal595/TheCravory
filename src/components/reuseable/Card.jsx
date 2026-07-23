import React from "react";
import Heading from "./Heading";

const Card = ({ fields, classname }) => {
  return (
    <>
      {fields.map((field, index) => (
        <div
          key={index}
          className={`${classname} flex h-50 justify-center items-center border border-(--border-dark-green) p-4 rounded-lg shadow-md gap-4 hover:-translate-y-2 transition-transform duration-300`}
        >
          <div className="flex flex-col items-center justify-center ">
            {field.icon}
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Heading text={field.title} />
            <p className="text-center">{field.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
