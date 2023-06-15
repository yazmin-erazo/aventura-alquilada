import { useState } from "react";
import styles from "./ImageGallery.module.css";
import ImagePopup from "./ImagePopup";

const ImageGallery = ({ product }) => {

  const mainImage = {
    id: 0,
    title: "Imagen principal",
    url: product?.imageURL,
  };

  const secondaryImages = product?.secondaryImages.map((image, index) => ({
    id: index,
    title: `Imagen ${index+1}`,
    url: image.imageURL,
  }));

  const images = [mainImage].concat(secondaryImages);

  const gridImages = secondaryImages.slice(0, 4);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainImage}>
          <div className={styles.imageContainer}>
            <img src={mainImage.url} alt={mainImage.title} />
          </div>
        </div>
        <div className={styles.gridContainer}>
          {gridImages.map((image) => (
            <div className={styles.gridItem} key={image.id}>
              <div className={styles.imageContainer}>
                <img src={image.url} alt={image.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.button}>
        <button className={styles.viewMore} onClick={() => setIsPopupOpen(true)}>
          Ver más
        </button>
      </div>
      {isPopupOpen && (
        <ImagePopup images={images} onClose={() => setIsPopupOpen(false)} />
      )}
    </>
  );
};

export default ImageGallery;