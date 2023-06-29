import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import styles from "./ReservationProductDetails.module.css";
import { TfiLocationPin } from "react-icons/tfi";
import CancellationPolicyModal from "./CancellationPolicyModal";
import { Link, useNavigate } from "react-router-dom";

const ReservationProductDetails = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const cancelReservation = () => {
    navigate("/")
  }

  return (
    <>
      {product && (
        <div className={styles.detailsContainer}>
          <div className={styles.productInfo}>
            <div className={styles.productContainerHeader}>
              <div className={styles.productImageContainer}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className={styles.productImage}
                    />
                  <div className={styles.overlay}>
                    <span className={styles.overlayText}>Ver detalles</span>
                  </div>
                </Link>
              </div>
              <div className={styles.productInfoHeader}>
                <p className={styles.category}>{product.category}</p>
                <h4 className={styles.productName}>{product.name} </h4>
                <span>• {product.brand}</span>
              </div>
            </div>
            <div className={styles.featuresContainer}>
              <div className={styles.feature}>
                <BiCheckCircle className={styles.featureIcon} />
                <p className={styles.featureText}>Cancelación gratuita</p>
              </div>
              <div className={styles.feature}>
                <TfiLocationPin className={styles.featureIcon} />
                <p className={styles.featureText}>{product.city.name}</p>
              </div>
            </div>
            <p className={styles.description}>{product.description}</p>
            <span
              onClick={() => setShowModal(true)}
              className={styles.cancellationPolicy}
            >
              Política de cancelación
            </span>
            <CancellationPolicyModal
              show={showModal}
              handleClose={() => setShowModal(false)}
            />
            <div className={styles.productPrice}>
              <h4 >Precio día</h4>
              <h3>$ {product.price}</h3>
            </div>
          </div>
        </div>
      )}
      <button
        className={`${styles["cancel-button"]} ${styles["button"]}`}
        onClick={() => cancelReservation()}
      >
        Cancelar Reserva
      </button>
    </>
  );
};

export default ReservationProductDetails;
