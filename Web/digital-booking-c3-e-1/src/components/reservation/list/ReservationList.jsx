import React, { useContext } from "react";
import { RentsContext } from "../../../context/RentsContext";
import ReservationCard from "../../resources/Cards/reservation/ReservationCard";
import styles from "./ReservationList.module.css"

const ReservationList = () => {
  const reservations = useContext(RentsContext);
  return (
    <div className={styles.containerRents}>
      <header className={styles.header}>
        <h4 className={styles.addRentsTitle}>Mi historial de reservas</h4>
      </header>
      <ReservationCard rents={reservations}/>
    </div>
  );
};

export default ReservationList;
