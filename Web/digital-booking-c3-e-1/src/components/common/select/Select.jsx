import React, { useState } from 'react';
import selectStyles from './select.module.css';

const Select = ({ options, onChange, children, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedOption, setSelectedOption] = useState('');

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div>
    <label className={selectStyles.label}>{children}</label>
    
    <select className={selectStyles.select} placeholder={placeholder}
    onChange={handleOptionClick}>
      {/* <div className={selectStyles.select} onClick={handleSelectClick}>
        <div className={selectStyles.selectedOption}>{selectedOption}</div>
        <div className={selectStyles.arrow}></div>
      </div> */}
      {/* {isOpen && ( */}
        {/* <div className={selectStyles.optionsList}> */}
        <option value={""} className={selectStyles.option} >{placeholder}</option>
          {options.map((option) => (
            <option
              key={option.id}
              className={selectStyles.option}
              value={option.id}
            >
              {option.name}
            </option>
          ))}
        {/* </div> */}
      {/* )} */}
    </select>
    </div>
  );
};

export default Select;