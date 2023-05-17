import styles from "./CardCategory.module.css";
import snowboardIcon from "../../../../assets/icons/snowboard.svg";


const CardCategory = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={snowboardIcon} alt="Category Snowboard" />
        <h3>{product.category}</h3>
      </div>
      <div className={styles.content}>
        
          <div className={styles.categoryImage}>
          <img src="https://dummyimage.com/200x150/EEF3F9/aaa" alt="Descripción de la imagen" />
          </div>

        
      </div>
    </div>
  );
};

export default CardCategory;
