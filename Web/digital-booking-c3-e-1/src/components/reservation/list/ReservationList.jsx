import React, { useCallback, useContext, useState } from "react";
import { RentsContext } from "../../../context/RentsContext";
import ReservationCard from "../../resources/Cards/reservation/ReservationCard";
import styles from "./ReservationList.module.css"

const ReservationList = () => {
  // const reservations = useContext(RentsContext);

  const [reservations, setReservations] = useState([
    {
      id: 1,
      name: "Lafuma Active",
      starDate: "20/06/2023",
      endDate: "20/06/2023",
      state: "Cancelado",
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

  const cancelReservation = useCallback((id) => {
    setReservations((prevRents) =>
      prevRents.map((reservation) =>
        reservation.id === id
          ? { ...reservation, state: "Cancelado" }
          : reservation
      )
    );
  }, []);

  const rebookReservation = useCallback((id) => {
    setReservations((prevRents) =>
      prevRents.map((reservation) =>
        reservation.id === id
          ? { ...reservation, state: "Reservado" }
          : reservation
      )
    );
  }, []);

  return (
    <div className={styles.containerRents}>
      <header className={styles.header}>
        <h4 className={styles.addRentsTitle}>Mi historial de reservas</h4>
      </header>
      <ReservationCard
        reservations={reservations}
        cancelReservation={cancelReservation}
        rebookReservation={rebookReservation}
      />
    </div>
  );
};

export default ReservationList;