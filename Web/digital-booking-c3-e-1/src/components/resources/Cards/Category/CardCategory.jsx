import React from "react";
import styles from "./CardCategory.module.css";
import { IconContext } from "react-icons";

const CardCategory = ({ category, onCategoryClick, selectedIcon }) => {
  const handleClick = () => {
    onCategoryClick(category);
  };

  const IconComponent = selectedIcon;
  const iconColor = "rgb(255 129 0)";

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        {IconComponent && (
          <div className={`${styles.icon} icon`}>
            <IconContext.Provider value={{ color: iconColor }}>
              {React.createElement(IconComponent, { size: 24 })}
            </IconContext.Provider>
          </div>
        )}
        <h4>{category.name}</h4>
      </div>
      <div className={styles.content}>
        <div
          className={styles.categoryImage}
          style={{ backgroundImage: `url(${category.imageURL})` }}
          role="img"
          aria-label={category.name}
        ></div>
      </div>
    </div>
  );
};

export default CardCategory;