import { useState } from "react";
import { BsShareFill } from "react-icons/bs";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";

import "./ShareIcon.css";

const ShareIcon = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const baseUrl =
    "http://equipamiento-deportivo-static.s3-website.us-east-2.amazonaws.com/";
  const productUrl = `${baseUrl}product/${product.id}`;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      closeModal();
    }
  };

  return (
    <div>
      <button className="container-button" onClick={openModal}>
        <BsShareFill size={16} />
        <p>Compartir</p>
      </button>
      {showModal && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-heading-container">
              <h2 className="modal-heading">{product.name}</h2>
              <div className="container-ubication">
                <p>
                  {product.city.genericName} · {product.city.name}
                </p>
                <div className="category">{product.category}</div>
              </div>
            </div>
            <div className="container-header-product">
              <div className="container-img">
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="description">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="social-media">
              <FacebookShareButton
                className="share-button"
                url={productUrl}
                quote=""
                hashtag="#equipamientoDeportivo"
              >
                <FacebookIcon size={36} round={true} />
              </FacebookShareButton>
              <TwitterShareButton
                className="share-button"
                url={productUrl}
                title=""
                hashtags={["equipamientoDeportivo", "aventura"]}
              >
                <TwitterIcon size={36} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton
                className="share-button"
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

export default ShareIcon;
