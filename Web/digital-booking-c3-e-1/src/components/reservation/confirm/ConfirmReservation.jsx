import React from "react";
import styles from "./ConfirmReservation.module.css";
import moment from "moment";
import "moment/locale/es"; // Importa el complemento 'es' para Moment.js
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import {
  BsCalendar4,
  BsCheck2Square,
  BsPerson,
  BsTicketPerforated,
} from "react-icons/bs";

registerLocale("es", es);
setDefaultLocale("es");

const ConfirmReservation = ({
  user,
  subscribe,
  selectedPreference,
  frequency,
  product,
  equipmentPreferences,
  comment,
  additionalContact,
  startDate,
  endDate,
  address,
}) => {
  const formatDate = (date) => {
    return moment(date).format("DD [de] MMMM [de] YYYY");
  };

  const formattedStartDate = moment(startDate, "DD/MMMM/YYYY").format(
    "DD [de] MMMM [de] YYYY"
  );
  const formattedEndDate = moment(endDate, "DD/MMMM/YYYY").format(
    "DD [de] MMMM [de] YYYY"
  );

  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <BsCheck2Square />{" "}
        </div>
        <h3 className={styles.title}>Confirmación de reserva</h3>
      </div>

      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}>
          <h4 className={styles.sectionTitle}>
            <BsPerson size={20} className={styles.sectionTitleIcon}/> Detalles de Usuario
          </h4>
          <div className={styles.userInfoItem}>
            <p className={styles.label}>Nombre:</p>
            <p className={styles.value}>
              {user.name} {user.lastname}
            </p>
          </div>
          <div className={styles.userInfoItem}>
            <p className={styles.label}>Email:</p>
            <p className={styles.value}>{user.sub}</p>
          </div>
          <div className={styles.userInfoItem}>
            <p className={styles.label}>Subscripción:</p>
            <p className={styles.value}>{subscribe ? "Sí" : "No"}</p>
          </div>
        </div>
        <div className={styles.userInfo}>
          <h4 className={styles.sectionTitle}>
            <BsTicketPerforated size={20} className={styles.sectionTitleIcon}/> Detalles de Reserva
          </h4>
          <div className={styles.userInfoItem}>
            <p className={styles.label}>Equipamiento adicional:</p>
            <p className={styles.value}>
              {equipmentPreferences.length === 0
                ? "Sin equipamiento adicional"
                : equipmentPreferences.join(", ")}
            </p>
          </div>
          <div className={styles.userInfoItem}>
        <p className={styles.label}>Preferencia de entrega:</p>
        {selectedPreference === "recoger" ? (
          <p className={styles.value}>Recoger en tienda</p>
        ) : (
          <p className={styles.value}>
            Entrega en {address}
          </p>
        )}
      </div>
      <div className={styles.userInfoItem}>
        <p className={styles.label}>Comentarios:</p>
        {comment.trim() !== "" ? (
          <p className={styles.value}>{comment}</p>
        ) : (
          <p className={styles.value}>Sin comentarios</p>
        )}
      </div>
        </div>
      </div>

      {additionalContact && (
        <>
          <div className={styles.additionalContactContainer}>
            <h4 className={styles.sectionTitle}>Segundo Contacto</h4>
            <div className={styles.additionInfoContainer}>
              <div className={styles.additionalContactInfo}>
                <p className={styles.label}>Nombre:</p>
                <p className={styles.value}>
                  {additionalContact.name} {additionalContact.lastName}
                </p>
              </div>
              <div className={styles.additionalContactInfo}>
                <p className={styles.label}>Email:</p>
                <p className={styles.value}>{additionalContact.email}</p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className={styles.datesContainer}>
        <div className={styles.sectionTitle}>
          <BsCalendar4 size={16} className={styles.sectionTitleIcon}/> <h4>Fechas de reservas</h4>
        </div>
        <div className={styles.datesInfoContainer}>
          <div className={styles.datesInfo}>
            <p className={styles.label}>Fecha de inicio:</p>
            <p className={styles.value}>{formattedStartDate}</p>
          </div>
          <div className={styles.datesInfo}>
            <p className={styles.label}>Fecha de fin:</p>
            <p className={styles.value}>{formattedEndDate}</p>
          </div>
        </div>
      </div>

      <div className={styles.price}>
        <p>Precio total:</p> <div>$ {product.price}</div>
      </div>
    </div>
  );
};

export default ConfirmReservation;
