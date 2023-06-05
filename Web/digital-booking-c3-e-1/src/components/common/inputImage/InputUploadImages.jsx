import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import styles from "./InputUploadImages.module.css";

const InputUploadImages = ({ onImageUpload }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
     },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onImageUpload(acceptedFiles);
      setUploadedImages(acceptedFiles);
    },
  });

  return (
    <div className={styles.imageUploadContainer} {...getRootProps()}>
      Cargar imagen:
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta las imágenes aquí</p>
      ) : (
        <div>
          {uploadedImages.length > 0 ? (
            <>
              <p>Imágenes cargadas:</p>
              <ul>
                {uploadedImages.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <FiUpload className={styles.icon} />
              <p>
                Arrastra y suelta las imágenes aquí o haz clic para seleccionar
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InputUploadImages;
