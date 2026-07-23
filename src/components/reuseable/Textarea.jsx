import React from "react";

const Textarea = ({
  className,
  label = "Address",
  id = "address",
  name = "address",
  placeholder = "Enter your address",
  rows = 2,
  value,
  onChange,
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="pl-1 text-(--text-dark-green)">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-2xl border border-(--bg-gold) px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--bg-gold) ${className}`}
      />
    </div>
  );
};

export default Textarea;
