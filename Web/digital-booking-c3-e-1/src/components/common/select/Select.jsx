import React, { useState } from "react";
import selectStyles from "./select.module.css";

const Select = ({ options, onChange, children, placeholder, disabledOption }) => {

  let placeholderSelect = placeholder;
  let defaultValue = 0;
  if(disabledOption){
    defaultValue = 2
    placeholderSelect = 10
  }

  const handleOptionClick = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div>
      <label className={selectStyles.label}>{children}</label>

      <select
        defaultValue={defaultValue}
        className={selectStyles.select}
        placeholder={placeholder}
        onChange={handleOptionClick}
      >
        <option value={defaultValue} className={selectStyles.option}>
          {placeholderSelect}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            className={selectStyles.option}
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
