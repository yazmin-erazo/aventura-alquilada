import React, { useCallback, useContext, useEffect, useState } from "react";
//import { RentsContext } from "../../../context/RentsContext";
import ReservationCard from "../../resources/Cards/reservation/ReservationCard";
import styles from "./ReservationList.module.css"
import RentsService from "../../../shared/services/RentsService";
import Swal from "sweetalert2";

const ReservationList = () => {
  // const reservations = useContext(RentsContext);

  const [reservations, setReservations] = useState([]);
  
  const cancelReservation = useCallback((id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a6cf7e",
      cancelButtonColor: "#fd7053",
      cancelButtonText: "No",
      confirmButtonText: "Sí, ¡Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await RentsService.deleteByID(id);
          if(res.status === 200 || res.status === 204) {
            setReservations((prevRents) =>
            prevRents.map((reservation) =>
            reservation.id === id
            ? { ...reservation, state: "Cancelado" }
            : reservation
            )
            );
            Swal.fire("¡Eliminado!",
            "La reserva ha sido eliminada.",
            "success")
          }

        }
        catch (error) {
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar la reseva.",
            "error"
          );
        }
      } else {
        Swal.close();
      }
    });
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