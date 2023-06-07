import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const ShareButtons = () => {
  const url = 'http://localhost:5173/';
  const title = `¡Eleva tu espíritu aventurero al siguiente nivel con nuestra aplicación de alquiler de equipo deportivo! Desde la escalada hasta los deportes acuáticos, el senderismo y más allá, cubrimos todas tus pasiones al aire libre. No te limites a soñar con la aventura, ¡vívela! Con nuestro extenso catálogo de equipos de alta calidad, estás a un clic de la acción. ¿Listo para la emoción? Da el primer paso hacia tu próxima gran aventura`;

  const styles = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  };

  return (
    <div style={styles}>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title} separator=": ">
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;