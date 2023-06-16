import React, { useState } from "react";
import styles from "./ImagePopup.module.css";

const ImagePopup = ({ images, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className={styles.popupBackground} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.carouselContainer}>
          <div
            className={styles.carouselSlides}
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.title}
                className={styles.carouselImage}
              />
            ))}
          </div>
          <button className={`${styles.carouselButton} ${styles.prev}`} onClick={handlePrev}>
            &#10094;
          </button>
          <button className={`${styles.carouselButton} ${styles.next}`} onClick={handleNext}>
            &#10095;
          </button>
          <div className={styles.paginator}>
            {images.map((_, index) => (
              <div
                key={index}
                className={`${styles.paginatorDot} ${index === currentImage ? styles.activeDot : ''}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;