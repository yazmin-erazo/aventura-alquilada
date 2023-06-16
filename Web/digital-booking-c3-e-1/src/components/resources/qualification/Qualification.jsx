import React, { useState } from "react";
import styles from "./Qualification.module.css";
import Swal from "sweetalert2";
import ProductsService from "../../../shared/services/ProductsService";
import InputWithLabel from "../../common/input/InputWithLabel";

const Qualification = ({ isLoggedIn, productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const handleMouseEnter = (starCount) => {
    setRating(starCount);
  };

  const handleMouseLeave = () => {
    setRating(0);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleClick = async (starCount) => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Debes iniciar sesión",
        text: "Inicia sesión para calificar y comentar sobre este producto",
        icon: "info",
      });
      return;
    }
    if (!comment) {
      Swal.fire({
        title: "Error",
        text: "El comentario es requerido para enviar la calificación",
        icon: "error",
      });
    } else {
      const commentRequest = {
        productId,
        comment: comment,
        score: starCount,
      };

      try {
        await ProductsService.comment(commentRequest);

        Swal.fire({
          title: "¡Calificación enviada!",
          text: `Has calificado el producto con ${starCount} estrellas y dejado el comentario: ${comment}`,
          icon: "success",
        });

        setComment("");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            "Hubo un problema enviando tu calificación. Por favor, inténtalo de nuevo más tarde",
          icon: "error",
        });
      }
    }
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
      {isLoggedIn ? (
        <div className={styles.commentContainer}>
          <InputWithLabel
            type="text"
            value={comment}
            placeholder="Escribe tu comentario..."
            onChange={(event) => handleCommentChange(event)}
          />
        </div>
      ) : (
        <p className={styles.loginMessage}>
          ¡Comparte tu opinión! Inicia sesión para calificar y dejar un comentario sobre este producto. Tu experiencia es valiosa para nosotros y para otros usuarios.
        </p>
      )}
    </div>
  );
};

export default Qualification;