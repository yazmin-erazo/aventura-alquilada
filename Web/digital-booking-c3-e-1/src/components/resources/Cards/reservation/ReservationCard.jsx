import { useState, useCallback } from "react";
import styles from "./ReservationCard.module.css";
import { BsCalendar4 } from "react-icons/bs";

const ReservationCard = ({
  reservations,
  cancelReservation,
  rebookReservation,
}) => {
  return (
    <div className={styles["rents-container"]}>
      {reservations.length === 0 ? (
        <p className={styles["no-rents"]}>No hay reservaciones.</p>
      ) : (
        <ul className={styles["rents-list"]}>
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              cancelReservation={cancelReservation}
              rebookReservation={rebookReservation}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const ReservationItem = ({
  reservation,
  cancelReservation,
  rebookReservation,
}) => {
  return (
    <li className={styles["reservation-card"]}>
      <div className={styles["reservation-image"]}>
        <img src={reservation.imageURL} alt="Imagen de la reserva" />
      </div>
      <div className={styles["reservation-info"]}>
        <div
          className={`${styles["name-product"]} ${styles["reservation-name"]}`}
        >
          {reservation.name}
        </div>
        <div className={styles["container-categoryDate"]}>
          <div className={styles["category"]}>{reservation.category}</div>
          <div className={styles["date"]}>
            <div className={styles["dates-container"]}>
              <div className={styles["date-start"]}>
                <BsCalendar4 className={styles["date-icon"]} />
                <span className={styles["date-text"]}>
                  {reservation.starDate}
                </span>
              </div>
              <div className={styles["date-separator"]}>-</div>
              <div className={styles["date-end"]}>
                <BsCalendar4 className={styles["date-icon"]} />
                <span className={styles["date-text"]}>
                  {reservation.endDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["reservation-actions"]}>
        <div className={styles["state"]} data-state={reservation.state}>
          {reservation.state}
        </div>
        <div className={styles["button-container"]}>
          {reservation.state !== "Cancelado" ? (
            <button
              className={`${styles["cancel-button"]} ${styles["button"]}`}
              onClick={() => cancelReservation(reservation.id)}
            >
              Cancelar Reserva
            </button>
          ) : (
            <button
              className={`${styles["rebook-button"]} ${styles["button"]}`}
              onClick={() => rebookReservation(reservation.id)}
            >
              Hacer Reserva
            </button>
          )}
          <button className={`${styles["details-button"]} ${styles["button"]}`}>
            Ver Detalles
          </button>
        </div>
      </div>
    </li>
  );
};

export default ReservationCard;