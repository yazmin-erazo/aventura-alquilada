import { useState } from "react";
import styles from "./ImageGallery.module.css";
import ImagePopup from "./ImagePopup";

const ImageGallery = ({ images }) => {
  const mainImage = images[0];
  const gridImages = images.slice(1, 5);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleViewMore = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainImage}>
          <img src={mainImage.url} alt={mainImage.title} />
        </div>
        <div className={styles.gridContainer}>
          {gridImages.map((image) => (
            <div className={styles.gridItem} key={image.id}>
              <img src={image.url} alt={image.title} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.button}>
        <button className={styles.viewMore} onClick={handleViewMore}>
          <i className="fa-solid fa-chevron-left">Ver más</i>
        </button>
      </div>
      {isPopupOpen && (
        <ImagePopup images={images} onClose={() => setIsPopupOpen(false)} />
      )}
    </>
  );
};

export default ImageGallery;
