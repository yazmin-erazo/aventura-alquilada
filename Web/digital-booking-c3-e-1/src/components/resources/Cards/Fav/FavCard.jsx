import React, { useEffect, useState } from "react";
import styles from "./FavCard.module.css";
import { BsClock, BsThreeDotsVertical } from "react-icons/bs";
import { FaHeartBroken } from "react-icons/fa";

const FavCard = ({ product, rentalType, onRemoveFavorite }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleDeleteFromFavorites = () => {
    onRemoveFavorite(product.id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest(`.${styles.menu}`)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className={styles.card}>
      <div className={styles.generalContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
            <img src={product.imageURL} alt="Imagen" />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            <h3>{product.name}</h3>
            <div className={styles.priceAndRentalContainer}>
              <span className={styles.price}>${product.price}</span>
              <div className={styles.rentalType}>
                <BsClock className={styles.icon} />
                <span>{rentalType}</span>
              </div>
            </div>
            <span className={styles.category}>{product.category}</span>
          </div>
          <div className={styles.description}>
            {/* <p>{product.description}</p> */}
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <span
          className={`${styles.menuIcon} ${
            showMenu ? styles.activeMenuIcon : ""
          }`}
          onClick={handleMenuToggle}
        >
          <div className={styles.iconDots}>
            <BsThreeDotsVertical />
          </div>
        </span>
        {showMenu && (
          <div
            className={styles.dropdownMenu}
            onClick={handleDeleteFromFavorites}
          >
            <span className={styles.menuItem}>
              <div className={styles.iconHeart}>
                <FaHeartBroken />
              </div>{" "}
              Eliminar de favoritos
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavCard;
