import React, { useState } from 'react';
import selectStyles from './select.module.css';

const Select = ({ options, onChange, children, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (id, name) => {
    setSelectedOption(name);
    setIsOpen(false);
    onChange(id);
  };

  return (
    <div>
    <label className={selectStyles.label}>{children}</label>
    
    <select className={selectStyles.selectContainer} placeholder={placeholder}>
      {/* <div className={selectStyles.select} onClick={handleSelectClick}>
        <div className={selectStyles.selectedOption}>{selectedOption}</div>
        <div className={selectStyles.arrow}></div>
      </div> */}
      {/* {isOpen && ( */}
        <div className={selectStyles.optionsList}>
          {options.map((option) => (
            <options
              key={option.id}
              className={selectStyles.option}
              onClick={() => handleOptionClick(option.id, option.name)}
            >
              {option.name}
            </options>
          ))}
        </div>
      {/* )} */}
    </select>
    </div>
  );
};

export default Select;