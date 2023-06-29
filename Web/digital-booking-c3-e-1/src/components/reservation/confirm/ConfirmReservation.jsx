import React, { useState } from "react";
import styles from "./ConfirmReservation.module.css";
import { differenceInDays } from "date-fns";
import "moment/locale/es";
import { differenceInDays } from "date-fns";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  BsCalendar4,
  BsCheck2Square,
  BsCreditCard,
  BsPerson,
  BsPersonPlus,
  BsTicketPerforated,
} from "react-icons/bs";
import PrivacyPolicyModal from "./PrivacyPolicies";
import PaymentGatewayModal from "./PaymentGatewayModal";

const ConfirmReservation = ({
  user,
  isSubscribe,
  delivery,
  product,
  equipmentPreferences,
  comment,
  additionalContact,
  startDate,
  endDate,
  address,
  isPrivacyAccepted,
  handlePrivacyAcceptanceChange,
  setIsPaymentCompletedButton,
  selectedStartDate,
  selectedEndDate,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const handlePaymentCompleted = () => {
    setIsPaymentCompletedButton(true);
    setIsPaymentCompleted(true);
  };

  const totalDays = differenceInDays(new Date(endDate), new Date(startDate));
  const totalPrice = product.price * totalDays;

  const inputStartDate = selectedStartDate || startDate;
  const inputEndDate = selectedEndDate || endDate;

  const formattedStartDate = format(new Date(inputStartDate), "dd 'de' MMMM 'de' yyyy", { locale: es });
const formattedEndDate = format(new Date(inputEndDate), "dd 'de' MMMM 'de' yyyy", { locale: es });

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
            <BsPerson size={20} className={styles.sectionTitleIcon} /> Detalles
            de Usuario
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
            <p className={styles.value}>{isSubscribe ? "Sí" : "No"}</p>
          </div>
        </div>
        <div className={styles.userInfo}>
          <h4 className={styles.sectionTitle}>
            <BsTicketPerforated size={20} className={styles.sectionTitleIcon} />{" "}
            Detalles de Reserva
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
            {delivery === "recoger en tienda" ? (
              <p className={styles.value}>Recoger en tienda</p>
            ) : (
              <p className={styles.value}>Entregar en {address}</p>
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
            <h4 className={styles.sectionTitle}>
              <BsPersonPlus size={20} className={styles.sectionTitleIcon} />
              Segundo Contacto
            </h4>
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
          <BsCalendar4 size={16} className={styles.sectionTitleIcon} />{" "}
          <h4>Fechas de reserva</h4>
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
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="privacyCheckbox"
          checked={isPrivacyAccepted}
          onChange={handlePrivacyAcceptanceChange}
          className={styles.checkbox}
        />
        <label htmlFor="privacyCheckbox" className={styles.checkboxLabel}>
          Confirmo que conozco y acepto las condiciones de uso del cliente y la
          <span
            className={styles.privacyPolicy}
            onClick={() => setShowModal(true)}
          >
            {" "}
            política de privacidad{" "}
          </span>{" "}
          de Digital Booking, así como las normas y regulaciones.
        </label>
      </div>

      <PrivacyPolicyModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      ></PrivacyPolicyModal>

      {isPaymentCompleted ? (
        <div className={styles.checkoutSuccess}>
          <div className={styles.top}>
            <div className={styles.iconAproved}></div>
            <div className={styles.iconBefore}></div>
            <p>¡Listo! Tu pago fue aprobado.</p>
          </div>
        </div>
      ) : (
        <div className={styles.price}>
          <div className={styles.priceItem}>Días totales de la reserva</div>
          <div className={styles.priceItem}>{totalDays} días</div>
          <div className={styles.priceItem}>Precio total a pagar</div>
          <div className={styles.priceItem}>$ {totalPrice}</div>
        </div>
      )}

      <button
        type="button"
        className={styles.buttonPayContainer}
        onClick={() => setShowPaymentModal(true)}
        disabled={isPaymentCompleted}
      >
        <BsCreditCard size={20} />
        {isPaymentCompleted ? "Pago Realizado" : "Realizar Pago"}
      </button>

      <PaymentGatewayModal
        show={showPaymentModal}
        handleClose={() => setShowPaymentModal(false)}
        productPrice={product.price}
        totalDays={totalDays}
        totalPrice={totalPrice}
        delivery={delivery}
        setIsPaymentCompleted={handlePaymentCompleted}
      />
    </div>
  );
};

export default ConfirmReservation;
