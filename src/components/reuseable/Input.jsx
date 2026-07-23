import React from "react";

const Input = ({
  label,
  type = "text",
  id,
  placeholder,
  className,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="pl-1 text-(--text-dark-green)">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`rounded-full border border-(--bg-gold) p-2 focus:outline-none focus:ring-2 focus:ring-(--bg-gold) ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
