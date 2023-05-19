import styles from "./CardCategory.module.css";
import { TbTent } from "react-icons/tb";
import { MdDownhillSkiing } from "react-icons/md";
import { MdDirectionsBike } from "react-icons/md";
import { MdOutlineSurfing } from "react-icons/md";
import { MdOutlineSnowboarding } from "react-icons/md";
import { FaMountain } from "react-icons/fa";
import { FaSwimmer } from "react-icons/fa";


const CardCategory = ({ category, onCategoryClick }) => {

  const categoryIcons = {
    1: TbTent, // Icono para ID 1: Camping
    2: MdOutlineSnowboarding, // Icono para ID 2: Snowboard
    3: MdOutlineSurfing, // Icono para ID 3: Surf
    4: MdDownhillSkiing, // Icono para ID 4: Esquí
    5: MdDirectionsBike, // Icono para ID 5: Bicicletas
    6: FaMountain, // Icono para ID 6: Escalada
    7: FaSwimmer, // Icono para ID 7: Acuáticos
  };

  const handleClick = () => {
    onCategoryClick(category);
  };

  const CategoryIcon = categoryIcons[category.id];

  const iconColor = "rgb(255 129 0)";
  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        {CategoryIcon && <CategoryIcon size={24} color={iconColor} />}{" "}
        <h3>{category.name}</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.categoryImage}>
          <img
            src={category.imageURL}
            alt={category.name}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCategory;
