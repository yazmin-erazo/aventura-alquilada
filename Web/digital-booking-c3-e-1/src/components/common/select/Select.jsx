import React, { useState } from 'react';
import selectStyles from './select.module.css';

const Select = ({ options, onChange, children }) => {
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
    
    <div className={selectStyles.selectContainer}>
      <div className={selectStyles.select} onClick={handleSelectClick}>
        <div className={selectStyles.selectedOption}>{selectedOption}</div>
        <div className={selectStyles.arrow}></div>
      </div>
      {isOpen && (
        <ul className={selectStyles.optionsList}>
          {options.map((option) => (
            <li
              key={option.id}
              className={selectStyles.option}
              onClick={() => handleOptionClick(option.id, option.name)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default Select;