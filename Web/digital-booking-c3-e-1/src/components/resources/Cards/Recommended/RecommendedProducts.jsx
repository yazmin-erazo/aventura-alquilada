import React, { useContext, useEffect, useState } from "react";
import styles from "./RecommendedProducts.module.css";
import ButtonPrimary from "../../../common/Buttons/ButtonPrimary";
import { BsClock, BsPin, BsPinMap } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import RatingStats from "../../rating/RatingStats";
import { IconContext } from "react-icons";
import { FaHeart } from "react-icons/fa";
import { UserContext } from "../../../../context/AuthContext";
import Swal from "sweetalert2";
import ProductsService from "../../../../shared/services/ProductsService";

const RecommendedProducts = ({
  product,
  rentalType,
  category,
  categoryIcon,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useContext(UserContext);
  const { dispatch } = useContext(UserContext);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();

    if (user.user.name) {
      setIsFavorite(!isFavorite);
      let buscarFav;
      const favoriteProducts = JSON.parse(
        sessionStorage.getItem("user")
      ).favorites;

      if (user.user.favorites.length > 0) {
        buscarFav = favoriteProducts.find((p) => p === product.id);
      }

      let resultado = favoriteProducts;

      if (!buscarFav) {
        resultado.push(product.id);
        ProductsService.addFav({ productId: product.id });
      } else {
        resultado = resultado.filter((id) => id !== buscarFav.id);
        ProductsService.deleteFav(product.id);
      }

      dispatch({
        type: "FAVS",
        payload: { ...user.user, favorites: resultado },
      });

      if (!isFavorite) {
        Swal.fire(
          "Agregado a favoritos",
          "El producto se ha agregado a favoritos con éxito.",
          "success"
        );
      } else {
        Swal.fire(
          "Eliminado de favoritos",
          "El producto se ha eliminado de favoritos con éxito.",
          "success"
        );
      }
    } else {
      Swal.fire(
        "Atención!",
        "Debés estar registrado para elegir tus favoritos",
        "info"
      );
    }
  };

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

  const isUsersFav = () => {
    if (user.user.name) {
      const favoriteProducts = JSON.parse(
        sessionStorage.getItem("user")
      ).favorites;
      if (favoriteProducts.includes(product.id)) setIsFavorite(true);
    }
  };

  useEffect(() => {
    isUsersFav();
  }, []);

  const iconColor = "rgb(255 129 0)";

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <div className={styles.favoriteButton}>
          <div
            className={`${styles.favoriteButton} ${
              isFavorite ? styles.favoriteActive : styles.heartIcon
            }`}
            onClick={(event) => handleFavoriteClick(event)}
          >
            <FaHeart />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.ratingAndCategory}>
          {" "}
          <div className={styles.rating}>
            <div className={styles.ratingStats}>
              <RatingStats
                color="var(--primary-300)"
                totalColor="var(--secondary-300)"
                className={styles.ratingStatsItem}
              />
            </div>
            {/* <div className={styles.ratingStars}>{renderRatingStars()}</div> */}
            {/* <p className={styles.numRatings}>{numRatings}</p> */}
          </div>
          {categoryIcon && (
            <div className={styles.categoryIconContainer}>
              <IconContext.Provider value={{ color: iconColor }}>
                {React.createElement(categoryIcon, {
                  size: 20,
                  className: styles.icon,
                })}
              </IconContext.Provider>
            </div>
          )}
        </div>
        <div className={styles.nameDistance}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.distance}> {product.distance.toFixed(0)} Km de ti</p>
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceAndRentalContainer}>
          <p className={styles.price}>$ {product.price}</p>
          <div className={styles.rentalType}>
            <BsClock className={styles.icon} />
            <span>{rentalType}</span>
          </div>
        </div>

        <ButtonPrimary>Ver detalles</ButtonPrimary>
      </div>
    </div>
  );
};

export default RecommendedProducts;
