import { IconContext } from "react-icons";
import { sportsIcons } from "../../common/SportsIcons";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import styles from "./IconSelect.module.css";

const ReactIcons = {
  ...MdIcons,
  ...FaIcons,
  ...TbIcons,
};

const IconSelect = ({ selectedIcon, handleIconSelect, children }) => {
  const iconOptions = Object.keys(ReactIcons)
    .filter((iconName) => sportsIcons.includes(iconName))
    .map((iconName) => {
      const IconComponent = ReactIcons[iconName];
      return (
        <div
          key={iconName}
          className={`${styles.iconOption} ${
            selectedIcon === iconName ? styles.selectedIcon : ""
          }`}
          onClick={() => handleIconSelect(iconName)}
        >
          <IconContext.Provider value={{ className: `${styles.selectIcon}` }}>
            <IconComponent />
          </IconContext.Provider>
          {/* <span className={styles.iconName}>{iconName}</span> */}
        </div>
      );
    });

  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>{children}</label>
      <div className={styles.iconSelect}>{iconOptions}</div>
    </div>
  );
};

export default IconSelect;
