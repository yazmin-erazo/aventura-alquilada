import React from "react";
import styles from "./ConfirmReservation.module.css";
import { BiCalendar, BiCheckCircle, BiUser } from "react-icons/bi";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineTexture } from "react-icons/md";
import moment from "moment";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { FaRegGrinTears } from "react-icons/fa";
import { AiOutlineCarryOut } from "react-icons/ai";
import { BsCalendar4, BsPerson, BsPersonPlus, BsTicketPerforated } from "react-icons/bs";
import { TbUser } from "react-icons/tb";

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
  
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <div className={styles.confirmationContainer}>
      <h3 className={styles.title}>Confirmación de reserva</h3>
      <div className={styles.productContainer}>
        <img
          src={product.imageURL}
          alt={product.name}
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <p className={styles.category}>{product.category}</p>
          <h4 className={styles.productName}>
            {product.name} • {product.brand}
          </h4>
          <p className={styles.location}>
            <TfiLocationPin className={styles.locationIcon} />{" "}
            {product.city.name}
          </p>
          <p className={styles.cancellation}>
            <BiCheckCircle className={styles.cancellationIcon} /> Cancelación
            gratuita
          </p>
          <p className={styles.material}>
            <MdOutlineTexture className={styles.materialIcon} />{" "}
            {product.material}
          </p>
        </div>
      </div>

      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}>
          <h4 className={styles.sectionTitle}><BsPerson /> Detalles de Usuario</h4>
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
          <h4 className={styles.sectionTitle}><BsTicketPerforated/> Detalles de Reserva</h4>
          <div className={styles.userInfoItem}>
            <p className={styles.label}>Equipamiento adicional:</p>
            <p className={styles.value}>{equipmentPreferences.join(", ")}</p>
          </div>
          <div className={styles.userInfoItem}>
            <p className={styles.label}>Preferencia de entrega:</p>
            {!selectedPreference === "recoger" && { selectedPreference }}
            {selectedPreference === "recoger" && (
              <p className={styles.value}>
                {selectedPreference} en <br />[ {address} ]
              </p>
            )}
          </div>
          <div className={styles.userInfoItem}>
            <p className={styles.label}>Comentarios:</p>
            <p className={styles.value}>{comment}</p>
          </div>
        </div>
      </div>

      {additionalContact && (
        <div className={styles.additionalContactContainer}>
          <h4 className={styles.sectionTitle}>Segundo Contacto</h4>
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
      )}

      <div className={styles.datesContainer}>
        <h4 className={styles.sectionTitle}><BsCalendar4 /> Fechas de reserva</h4>
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
