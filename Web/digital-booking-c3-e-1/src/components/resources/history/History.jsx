import React, { useState } from "react";
import styles from "./History.module.css";
import { MdDateRange } from "react-icons/md";
import { BsCalendar4 } from "react-icons/bs";

const History = () => {
  const [rents, setRents] = useState([
    {
      id: 1,
      name: "Lafuma Active",
      starDate: "20/06/2023",
      endDate: "20/06/2023",
      state: "cancelado",
      category: "Camping",
      imageURL:
        "https://img.freepik.com/fotos-premium/nina-leyendo-libro-frente-tienda-atmosfera-salvaje_482257-11531.jpg?w=1380",
    },
    {
      id: 2,
      name: "Boardworks Froth",
      starDate: "18/06/2023",
      endDate: "22/06/2023",
      state: "En curso",
      category: "Surf",
      imageURL:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/42b86238301361.575c8e19284c7.png",
    },
    {
      id: 3,
      name: "Bestway",
      starDate: "15/06/2023",
      endDate: "18/06/2023",
      state: "Reservado",
      category: "Acuáticos",
      imageURL:
        "https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/Kayak inflableBestwayKayak.jpg",
    },
  ]);

  const cancelReservation = (id) => {
    setRents(
      rents.map((reservation) => {
        if (reservation.id === id) {
          return { ...reservation, state: "cancelado" };
        }
        return reservation;
      })
    );
  };

  const rebookReservation = (id) => {
    setRents(
      rents.map((reservation) => {
        if (reservation.id === id) {
          return { ...reservation, state: "Reservado" };
        }
        return reservation;
      })
    );
  };

  return (
    <div className={styles["rents-container"]}>
      <h2 className={styles["title"]}>Historial de Rents</h2>
      {rents.length === 0 ? (
        <p className={styles["no-rents"]}>No hay rents.</p>
      ) : (
        <ul className={styles["rents-list"]}>
          {rents.map((reservation) => (
            <li key={reservation.id} className={styles["reservation-card"]}>
              <div className={styles["reservation-image"]}>
                <img src={reservation.imageURL} alt="Imagen de la reservation" />
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
                  {" "}
                  {reservation.state !== "cancelado" ? (
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
                  <button
                    className={`${styles["details-button"]} ${styles["button"]}`}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
