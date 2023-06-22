import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
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
        <div
          className={`${style.dropdownContent} ${isOpen ? style.opened : ""}`}
        >
          {isOpen &&
            options.map((option) => (
              <div
                key={option.id}
                className={style.dropdownOption}
                onClick={() => handleChipClick(option.name)}
              >
                {option.hex && (
                  <div className={style.colorOptionContainer}>
                    <div
                      className={style.colorOption}
                      style={{ backgroundColor: option.hex }}
                    ></div>
                  </div>
                )}
                {option.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownFilter;