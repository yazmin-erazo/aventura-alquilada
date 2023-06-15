import React, { useState } from 'react';
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

  return (
    <div>
      <button onClick={openModal}>
        Compartir
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-heading">¡Comparte la emoción! Elige tu red social favorita para difundir la aventura.</h2>
            <div>
              <FacebookShareButton url={baseUrl} quote={message}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={baseUrl} title={message}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton url={baseUrl} title={message} separator=": ">
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

export default ShareButtons;