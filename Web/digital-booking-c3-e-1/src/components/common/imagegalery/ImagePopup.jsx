import { Modal, Carousel } from "react-bootstrap";
import styles from "./ImageGallery.module.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const ImagePopup = ({ images, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Body>
        <Carousel>
          {images.map((image) => (
            <Carousel.Item key={image.id}>
              <img className={styles.imagesize}  src={image.url} alt={image.title} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>

      
    </Modal>
  );
};

export default ImagePopup;