
import styles from "./RecommendedProducts.module.css";
import ButtonPrimary from "../../../common/Buttons/ButtonPrimary"
import { TbTent } from "react-icons/tb";
import { MdOutlineSurfing, MdDownhillSkiing, MdDirectionsBike, MdOutlineSnowboarding } from "react-icons/md";
import { FaMountain, FaSwimmer } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const RecommendedProducts = ({ product, rentalType, categories }) => {
  
  const calculateAverageRating = (ratings) => {
    if (Array.isArray(ratings) && ratings.length > 0) {
      const sum = ratings.reduce((total, rating) => total + rating);
      return sum / ratings.length;
    }
    return 0;
  };

  const averageRating = calculateAverageRating(product.ratings);
  const numRatings = product.ratings ? product.ratings.length : 0;

  const renderRatingStars = () => {
    const stars = [];
    const roundedRating = Math.round(averageRating);

    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push(<FaStar key={i} className={styles.star} />);
      } else {
        stars.push(<FaStar key={i} className={styles.starEmpty} />);
      }
    }

    return stars;
  };

  const categoryIcons = {
    "Camping": TbTent,
    "Snowboard": MdOutlineSnowboarding,
    "Surf": MdOutlineSurfing,
    "Esquí": MdDownhillSkiing,
    "Bicicletas": MdDirectionsBike,
    "Escalada": FaMountain,
    "Deportes acuáticos": FaSwimmer,
  };

  const CategoryIcon = categoryIcons[product.category];
  const iconColor = "rgb(255 129 0)";

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.ratingAndCategory}>
          {" "}
          <div className={styles.rating}>
            <div className={styles.ratingStars}>{renderRatingStars()}</div>
            <p className={styles.numRatings}>{numRatings}</p>
          </div>
          {CategoryIcon && (
            <div className={styles.categoryIconContainer}>
              <CategoryIcon
                size={20}
                className={styles.icon}
                color={iconColor}
              />
            </div>
          )}
        </div>

        <h3 className={styles.name}>{product.name}</h3>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceAndRentalContainer}>
          <p className={styles.price}>$ {product.price}</p>
          <div className={styles.rentalType}>
            <BsClock className={styles.icon} />
            <span>{rentalType}</span>
          </div>
        </div>

        {/* <button className={styles.button}>Ver detalles</button> */}
        <ButtonPrimary>Ver detalles</ButtonPrimary>
      </div>
    </div>
  );
};

export default RecommendedProducts;

