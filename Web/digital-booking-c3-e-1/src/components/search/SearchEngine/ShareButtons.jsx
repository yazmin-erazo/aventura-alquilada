import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import styles from './ShareButtons.module.css';

const ShareButtons = () => {
  const [showModal, setShowModal] = useState(false);

  const baseUrl = 'http://aventura-alquilada.ddns.net/';
  const message = `¡Desata tu lado aventurero con nuestro alquiler de equipo deportivo! 🌊🧗 De la escalada a los deportes acuáticos, lo tenemos TODO. ¡No sueñes, vive la aventura! 🔥 Equípate con lo mejor y sumérgete en la acción. 🚀 Tu próxima aventura te espera: `;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.className.includes(styles.modal)) {
      closeModal();
    }
  };

  return (
    <div className={styles['share-buttons-container']}>
      <button className={styles['open-modal-button']} onClick={openModal}>
        <FaShareAlt className={styles['share-icon']} />
        Compartir
      </button>
      {showModal && (
        <div className={styles.modal} onClick={handleOutsideClick}>
          <div className={styles['modal-content']}>
            <button className={styles['close-button']} onClick={closeModal}>&times;</button>
            <h2 className={styles['modal-heading']}>¡Comparte la emoción! Elige tu red social favorita para difundir la aventura.</h2>
            <div>
              <FacebookShareButton className={styles['share-button']} url={baseUrl} quote={message}>
                <FacebookIcon size={36} round={true} />
              </FacebookShareButton>
              <TwitterShareButton className={styles['share-button']} url={baseUrl} title={message}>
                <TwitterIcon size={36} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton className={styles['share-button']} url={baseUrl} title={message} separator=": ">
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