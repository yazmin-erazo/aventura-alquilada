import React from "react";
import moment from "moment";
import styles from "./CalendarProducts.module.css";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";

const SelectedDates = ({
  selectedStartDate,
  selectedEndDate,
  totalRentalDays,
}) => {

  const navigate = useNavigate();
  const handleClick = () => {  
    if(JSON.parse(sessionStorage.getItem("user"))){
      navigate("/reserva"); //link a la pag de reserva
    }else {
      navigate("/login");
      Swal.fire("Error", "Debe iniciar sesión para poder iniciar una reserva", "error");
    }

  }

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <div className={styles.selectedDates}>
      <div className={styles.selectedDatesContainer}>
        <p className={styles.selectedDatesTitle}>Fechas seleccionadas</p>
        <div className={styles.textDates}>
          <div>
            <span>Fecha de inicio:</span> {formatDate(selectedStartDate)}
          </div>
          <div>
            <span>Fecha de fin:</span> {formatDate(selectedEndDate)}
          </div>
          <div>
            <span>Días totales de renta:</span> {totalRentalDays} días
          </div>
        </div>
        <div className={styles.buttonTextDates}>
          <button className={styles.buttonCalendar} onClick={handleClick}>Iniciar reserva</button>
        </div>
      </div>
    </div>
  );
};

export default SelectedDates;
