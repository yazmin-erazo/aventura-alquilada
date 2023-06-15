import ButtonSecondary from "../../../common/Buttons/ButtonSecondary";
import styles from "./ProductCard.module.css";
import { AiOutlineClockCircle } from "react-icons/ai";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.imageURL} alt={product.name} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.priceAndType}>
          <p className={styles.price}>{product.price}</p>
          <div className={styles.type}>
            <span className={styles.typeIcon}>
              <AiOutlineClockCircle />
            </span>
            <span className={styles.typeDuration}>2 hours</span>
          </div>
        </div>
        <ButtonSecondary>Ver detalles</ButtonSecondary>
      </div>
    </div>
  );
};

export default ProductCard;
