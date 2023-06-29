import { useState, useCallback, useEffect } from "react";
import styles from "./ReservationCard.module.css";
import { BsCalendar4 } from "react-icons/bs";
import Pagination from "../../pagination/Pagination";
import moment from "moment";
import RentsService from "../../../../shared/services/RentsService";
import Swal from "sweetalert2";

const ReservationCard = ({
  reservations,
  cancelReservation,
  rebookReservation,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [currentReservations, setCurrentReservations] = useState(reservations);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    const slicedReservations = reservations.slice(offset, offset + pageLimit);
    setCurrentReservations(slicedReservations);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, pageLimit]);

  return (
    <div className={styles["rents-container"]}>
      {reservations.length === 0 ? (
        <p className={styles["no-rents"]}>No hay reservaciones.</p>
      ) : (
        <>
          <ul className={styles["rents-list"]}>
            {currentReservations.map((reservation) => (
              <ReservationItem
                key={reservation.id}
                reservation={reservation}
                cancelReservation={cancelReservation}
                rebookReservation={rebookReservation}
              />
            ))}
          </ul>
          <Pagination
            onPageChanged={onPageChanged}
            limit={pageLimit}
            total={reservations.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setLimit={setPageLimit}
          />
        </>
      )}
    </div>
  );
};

const ReservationItem = ({
  reservation,
  cancelReservation,
  rebookReservation,
}) => {
  const formatDate = (date) => {
    return moment(date).add(1, "days").format("DD/MM/YYYY");
  };

  return (
    <li className={styles["reservation-card"]}>
      <div className={styles["reservation-image"]}>
        <img src={reservation.product.imageURL} alt="Imagen de la reserva" />
      </div>
      <div className={styles["reservation-info"]}>
        <div
          className={`${styles["name-product"]} ${styles["reservation-name"]}`}
        >
          {reservation.product.name}
        </div>
        <div className={styles["container-categoryDate"]}>
          <div className={styles["category"]}>
            {reservation.product.category}
          </div>
          <div className={styles["date"]}>
            <div className={styles["dates-container"]}>
              <div className={styles["date-start"]}>
                <BsCalendar4 className={styles["date-icon"]} />
                <span className={styles["date-text"]}>
                  {formatDate(reservation.starDate)}
                </span>
              </div>
              <div className={styles["date-separator"]}>-</div>
              <div className={styles["date-end"]}>
                <BsCalendar4 className={styles["date-icon"]} />
                <span className={styles["date-text"]}>
                  {formatDate(reservation.endDate)}
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
          {reservation.state !== "CANCELADO" ? (
            <button
              data-testid="cancel-button"
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
