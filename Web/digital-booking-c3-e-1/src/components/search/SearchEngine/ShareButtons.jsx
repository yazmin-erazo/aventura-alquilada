import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const ShareButtons = () => {
  const baseUrl = 'http://equipamiento-deportivo-static.s3-website.us-east-2.amazonaws.com/';
  const message = `¡Desata tu lado aventurero con nuestro alquiler de equipo deportivo! 🌊🧗 De la escalada a los deportes acuáticos, lo tenemos TODO. ¡No sueñes, vive la aventura! 🔥 Equípate con lo mejor y sumérgete en la acción. 🚀 Tu próxima aventura te espera: `;

  const styles = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  };

  return (
    <div style={styles}>
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
  );
};

export default ShareButtons;