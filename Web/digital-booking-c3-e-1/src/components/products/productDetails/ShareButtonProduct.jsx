import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import './ShareButtonProduct.css';

const ShareButtonProduct = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  
  const baseUrl = 'http://equipamiento-deportivo-static.s3-website.us-east-2.amazonaws.com/';
  const productUrl = `${baseUrl}product/${product.id}`;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h4>Compartir producto</h4>
      <button onClick={openModal}>
        Compartir
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{product.name}</h2>
            <img src={product.imageURL} alt={product.name} />
            <p>{product.description}</p>
            <div>
              <FacebookShareButton
                url={productUrl}
                quote=""
                hashtag="#equipamientoDeportivo"
              >
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton
                url={productUrl}
                title=""
                hashtags={['equipamientoDeportivo', 'aventura']}
              >
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={productUrl}
                title=""
              >
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
            </div>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtonProduct;