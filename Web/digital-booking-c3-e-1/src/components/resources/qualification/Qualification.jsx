import React, { useState } from "react";
import styles from "./Qualification.module.css";
import RatingStats from "../rating/RatingStats";

const Qualification = () => {
  const [rating, setRating] = useState(0);

  const handleMouseEnter = (starCount) => {
    setRating(starCount);
  };

  const handleMouseLeave = () => {
    setRating(0);
  };

  const handleClick = (starCount) => {
    // Enviar la reseña con la calificación seleccionada
    console.log(`Calificación seleccionada: ${starCount}`);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= rating ? styles.filled : "";
      stars.push(
        <button
          key={i}
          className={`${styles.star} ${starClassName}`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          &#9733;
        </button>
      );
    }
    return stars;
  };

  return (
    <div className={styles.reviewComponent}>
        <div>
      <h4>Valorar producto</h4>
      </div>
      <div className={styles.starsContainer}>{renderStars()}</div>
      <p className={styles.reviewText}>
      Inicia sesión para agregar una reseña. Nos ayudará a verificar la autenticidad de tu correo electrónico.
      </p>
    </div>
  );
};

export default Qualification;
