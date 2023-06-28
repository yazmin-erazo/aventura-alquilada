import React from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import styles from "./ReservationDetails.module.css";
import { BsTicketPerforated } from "react-icons/bs";

const ReservationDetails = ({
  product,
  startDate,
  endDate,
  delivery,
  frequency,
  equipmentPreferences,
  comment,
  address,
  handleStartDateChange,
  handleEndDateChange,
  handlePreferenceChange,
  handleFrequencyOptionClick,
  handleEquipmentPreferenceToggle,
  handleCommentChange,
  handleAddressChange,
}) => {
  console.log(delivery);
  return (
    <>
      <div className={styles.container}>
        {product && (
          <>
            <div className={styles.header}>
              <div className={styles.headerIcon}>
                <BsTicketPerforated />{" "}
              </div>
              <h3 className={styles.title}>Detalles de la reserva</h3>
            </div>
          </>
        )}
        <div className={styles.containerInputs}>
          <span className={styles.preferenceLabel}>
            Preferencias de entrega
          </span>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainer}>
              <InputWithLabel
                value={startDate}
                onChange={handleStartDateChange}
                label="Fecha de inicio"
                className={styles.input}
              >
                Fecha de inicio
              </InputWithLabel>
            </div>
            <div className={styles.inputContainer}>
              <InputWithLabel
                value={endDate}
                onChange={handleEndDateChange}
                label="Fecha de fin"
                className={styles.input}
              >
                Fecha de fin
              </InputWithLabel>
            </div>
          </div>
        </div>

        <div className={styles.preferenceContainer}>
          <span className={styles.preferenceLabel}>
            Preferencias de entrega
          </span>
          <div className={styles.preferenceOptions}>
            <div
              className={`${styles.preferenceOption} ${
                delivery === "recoger" ? styles.active : ""
              }`}
              onClick={() => handlePreferenceChange("recoger")}
            >
              Recoger
            </div>
            <div
              className={`${styles.preferenceOption} ${
                delivery === "entrega" ? styles.active : ""
              }`}
              onClick={() => handlePreferenceChange("entrega")}
            >
              Servicio de entrega
            </div>
          </div>
          {delivery === "entrega" && (
            <div className={styles.addressContainer}>
              <InputWithLabel
                value={address}
                onChange={handleAddressChange}
                label="Dirección de envío"
                className={styles.input}
              >
                Dirección de envío
              </InputWithLabel>
              <span>
                * Debe seleccionar una direccion de envio para continuar
              </span>
            </div>
          )}
        </div>
        <div className={styles.preferenceContainer}>
          <span className={styles.preferenceLabel}>
            Preferencias de equipamiento adicional:
          </span>
          <div className={styles.equipmentPreferences}>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentcasco"
                checked={equipmentPreferences.includes("casco")}
                onChange={() => handleEquipmentPreferenceToggle("casco")}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentcasco" className={styles.preferenceText}>Casco adicional</label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentmapas"
                checked={equipmentPreferences.includes("mapas")}
                onChange={() => handleEquipmentPreferenceToggle("mapas")}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentmapas" className={styles.preferenceText}>Mapa de rutas</label>
            </div>
          </div>
          <div className={styles.transparencyNote}>
            <p>
              <span>*</span> Recopilamos tus preferencias de equipamiento
              adicional para asegurarnos de que tengas todo lo necesario para
              disfrutar de tu actividad al máximo.
            </p>
          </div>
        </div>

        <div className={styles.commentContainer}>
          <label className={styles.commentLabel}>Comentarios:</label>
          <textarea
            className={styles.commentInput}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Deja tus comentarios aquí..."
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default ReservationDetails;

{
  /* <div className={styles.preferenceContainer}>
          <span className={styles.preferenceLabel}>
            Frecuencia de participación en la actividad:
          </span>
          <div className={styles.preferenceOptions}>
            <div
              className={`${styles.preferenceOption} ${
                frequency === "primera" ? styles.active : ""
              }`}
              onClick={() => handleFrequencyOptionClick("primera")}
            >
              Primera vez
            </div>
            <div
              className={`${styles.preferenceOption} ${
                frequency === "ocasional" ? styles.active : ""
              }`}
              onClick={() => handleFrequencyOptionClick("ocasional")}
            >
              Ocasionalmente
            </div>
            <div
              className={`${styles.preferenceOption} ${
                frequency === "regular" ? styles.active : ""
              }`}
              onClick={() => handleFrequencyOptionClick("regular")}
            >
              Regularmente
            </div>
          </div>
        </div> */
}
