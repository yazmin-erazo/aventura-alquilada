import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import Chip from "../Chip";
import style from "./DropdownFilter.module.css";

const DropdownFilter = ({
  label,
  options,
  selectedValue,
  handleToggle,
  handleChipClick,
  isOpen,
}) => {

    
    return (
        <div className={style.filterSection}>
          <div className={style.dropdown}>
            <div className={style.dropdownHeader} onClick={handleToggle}>
              <span className={style.dropdownHeaderText}>{label}</span>
              <span className={style.dropdownHeaderIcon}>
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
            <div className={`${style.dropdownContent} ${isOpen ? style.opened : ''}`}>
              {isOpen &&
                options.map((option) => (
                  <Chip
                    key={option.id}
                    label={option.name}
                    selected={selectedValue === option.name}
                    onClick={() => handleChipClick(option.name)}
                  />
                ))}
            </div>
          </div>
        </div>
      );
};

export default DropdownFilter;
