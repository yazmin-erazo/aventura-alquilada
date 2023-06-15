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

  const handleOutsideClick = (event) => {
    if (event.target.className === 'modal') {
      closeModal();
    }
  };

  return (
    <div>
      <h4>Compartir producto</h4>
      <button className="open-modal-button" onClick={openModal}>
        Compartir
      </button>
      {showModal && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2 className="modal-heading">{product.name}</h2>
            <img src={product.imageURL} alt={product.name} />
            <p>{product.description}</p>
            <div>
              <FacebookShareButton className="share-button" url={productUrl} quote="" hashtag="#equipamientoDeportivo">
                <FacebookIcon size={36} round={true} />
              </FacebookShareButton>
              <TwitterShareButton className="share-button" url={productUrl} title="" hashtags={['equipamientoDeportivo', 'aventura']}>
                <TwitterIcon size={36} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton className="share-button" url={productUrl} title="">
                <WhatsappIcon size={36} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtonProduct;