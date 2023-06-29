import React, { useEffect, useState } from "react";
import selectStyles from "./select.module.css";
import Select from "./Select";

const ProductConditionSelect = ({ onChange, children, placeholder }) => {
  const options = [
    { id: "Nuevo", name: "Nuevo" },
    { id: "Seminuevo", name: "Seminuevo" },
    { id: "Reacondicionado", name: "Reacondicionado" },
    { id: "Buen estado", name: "Buen estado" },
    { id: "Defectuoso", name: "Defectuoso" },
  ];

  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");

  // const handleSelectClick = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleOptionClick = (id, name) => {
  //   setSelectedOption(name);
  //   setIsOpen(false);
  //   onChange(name);
  // };

  // return (
  //   <div>
  //     <label className={selectStyles.label}>{children}</label>
  //     <div className={selectStyles.selectContainer}>
  //       <div className={selectStyles.select} onClick={handleSelectClick}>
  //         <div className={selectStyles.selectedOption}>{selectedOption}</div>
  //         <div className={selectStyles.arrow}></div>
  //       </div>
  //       {isOpen && (
  //         <ul className={selectStyles.optionsList}>
  //           {options.map((option) => (
  //             <li
  //               key={option.id}
  //               className={selectStyles.option}
  //               onClick={() => handleOptionClick(option.id, option.name)}
  //             >
  //               {option.name}
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </div>
  //   </div>
  // );

  return(
    <Select options={options} onChange={onChange} placeholder={placeholder} >Condición</Select>
  )
};

export default ProductConditionSelect;
