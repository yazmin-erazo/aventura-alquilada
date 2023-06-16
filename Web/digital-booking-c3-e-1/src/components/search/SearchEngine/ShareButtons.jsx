import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import './ShareButtons.css';

const ShareButtons = () => {
  const [showModal, setShowModal] = useState(false);

  const baseUrl = 'http://equipamiento-deportivo-static.s3-website.us-east-2.amazonaws.com/';
  const message = `¡Desata tu lado aventurero con nuestro alquiler de equipo deportivo! 🌊🧗 De la escalada a los deportes acuáticos, lo tenemos TODO. ¡No sueñes, vive la aventura! 🔥 Equípate con lo mejor y sumérgete en la acción. 🚀 Tu próxima aventura te espera: `;

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
    <div className="share-buttons-container">
      <button className="open-modal-button" onClick={openModal}>
        <FaShareAlt className="share-icon" />
        Compartir
      </button>
      {showModal && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2 className="modal-heading">¡Comparte la emoción! Elige tu red social favorita para difundir la aventura.</h2>
            <div>
              <FacebookShareButton className="share-button" url={baseUrl} quote={message}>
                <FacebookIcon size={36} round={true} />
              </FacebookShareButton>
              <TwitterShareButton className="share-button" url={baseUrl} title={message}>
                <TwitterIcon size={36} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton className="share-button" url={baseUrl} title={message} separator=": ">
                <WhatsappIcon size={36} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;