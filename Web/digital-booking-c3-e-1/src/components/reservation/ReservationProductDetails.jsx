import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdOutlineTexture } from "react-icons/md";
import styles from "./ReservationProductDetails.module.css";
import { TfiLocationPin } from "react-icons/tfi";

const ReservationProductDetails = ({ product }) => {
  return (
    <>
      {product && (
        <div className={styles.detailsContainer}>
          <div className={styles.productInfo}>
            <div className={styles.productContainerHeader}>
              <div className={styles.productImageContainer}>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.overlay}>
                  <span className={styles.overlayText}>Ver detalles</span>
                </div>
              </div>
              <div className={styles.productInfoHeader}>
                <p className={styles.category}>{product.category}</p>
                <h4 className={styles.productName}>
                  {product.name} • {product.brand}
                </h4>
              <div className={styles.locationContainer}>
                <TfiLocationPin className={styles.locationIcon} />
                <p className={styles.location}>{product.city.name}</p>
              </div>
              </div>
            </div>
            <div className={styles.featuresContainer}>
              <div className={styles.feature}>
                <BiCheckCircle className={styles.featureIcon} />
                <p className={styles.featureText}>Cancelación gratuita</p>
              </div>
              <div className={styles.feature}>
                <MdOutlineTexture className={styles.featureIcon} />
                <p className={styles.featureText}>{product.material}</p>
              </div>
            </div>
            <p className={styles.description}>{product.description}</p>
            <a href="/" className={styles.cancellationPolicy}>
              Política de cancelación
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationProductDetails;
