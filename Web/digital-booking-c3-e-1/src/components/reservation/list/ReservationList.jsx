import React, { useCallback, useContext, useEffect, useState } from "react";
//import { RentsContext } from "../../../context/RentsContext";
import ReservationCard from "../../resources/Cards/reservation/ReservationCard";
import styles from "./ReservationList.module.css"
import RentsService from "../../../shared/services/RentsService";

const ReservationList = () => {
  // const reservations = useContext(RentsContext);

  const [reservations, setReservations] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const rents = await RentsService.getAll();
    setReservations(rents);
  }

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