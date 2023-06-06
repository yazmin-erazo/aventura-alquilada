import React, { useState } from "react";
import styles from "./Qualification.module.css";
import Swal from "sweetalert2";

const Qualification = () => {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const handleMouseEnter = (starCount) => {
    setRating(starCount);
  };

  const handleMouseLeave = () => {
    setRating(0);
  };

  const handleClick = (starCount) => {
    // Actualizar la calificación promedio y el total de calificaciones ficticiamente
    const newTotalRatings = totalRatings + 1;
    const newAverageRating =
      (averageRating * totalRatings + starCount) / newTotalRatings;

    setTotalRatings(newTotalRatings);
    setAverageRating(newAverageRating);

    // Mostrar la SweetAlert de calificación enviada
    Swal.fire({
      title: "¡Calificación enviada!",
      text: `Has calificado el producto con ${starCount} estrellas.`,
      icon: "success",
    });
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
      <h4>Valorar producto</h4>
      <div className={styles.starsContainer}>{renderStars()}</div>
      <div className={styles.commentContainer}>
        <p className={styles.commentText}>
        Inicia sesión para agregar una reseña. Nos ayudará a verificar la autenticidad de tu correo electrónico.
        </p>
      </div>
    </div>
  );
};

export default Qualification;
