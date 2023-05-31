import styles from "./ImageUpload.module.css";

const ImageUpload = ({ onImageUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onImageUpload(file);
  };

  return (
    <div className={styles.imageUploadContainer}>
      <label className={styles.label}>
        Cargar imagen:
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
