import { useState } from "react";
import { BsShareFill } from "react-icons/bs";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import styles from "./ButtonShare.module.css";

const ButtonShare = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const baseUrl =
    "http://aventura-alquilada.ddns.net/";
  const productUrl = product && `${baseUrl}products/${product.id}`;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.className === styles.modal) {
      closeModal();
    }
  };

  return (
    <div>
      <button className={styles.containerButton} onClick={openModal}>
        <BsShareFill size={16} />
        <p>Compartir</p>
      </button>
      {showModal && (
        <div className={styles.modal} onClick={handleOutsideClick}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <div className={styles.modalHeadingContainer}>
              <h2 className={styles.modalHeading}>{product && product.name}</h2>
              <div className={styles.containerUbication}>
                <p>
                  {product && product.city.genericName} · {product && product.city.name}
                </p>
                <div className={styles.category}>{product && product.category}</div>
              </div>
            </div>
            <div className={styles.containerHeaderProduct}>
              <div className={styles.containerImg}>
                <img src={product && product.imageURL} alt={product && product.name} />
              </div>
              <div className={styles.description}>
                <p>{product && product.description}</p>
              </div>
            </div>

            <div className={styles.socialMedia}>
              <FacebookShareButton
                className={styles.shareButton}
                url={productUrl}
                quote=""
                hashtag="#equipamientoDeportivo"
              >
                <FacebookIcon size={36} round={true} />
              </FacebookShareButton>
              <TwitterShareButton
                className={styles.shareButton}
                url={productUrl}
                title=""
                hashtags={["equipamientoDeportivo", "aventura"]}
              >
                <TwitterIcon size={36} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton
                className={styles.shareButton}
                url={productUrl}
                title=""
              >
                <WhatsappIcon size={36} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonShare;
