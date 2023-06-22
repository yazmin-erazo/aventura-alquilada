import React from "react";
import moment from "moment";
import styles from "./CalendarProducts.module.css";

const SelectedDates = ({
  selectedStartDate,
  selectedEndDate,
  totalRentalDays,
}) => {
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const minDate = selectedStartDate < selectedEndDate ? selectedStartDate : selectedEndDate;
  const maxDate = selectedStartDate > selectedEndDate ? selectedStartDate : selectedEndDate;

  return (
    <div className={styles.selectedDates}>
      <div className={styles.selectedDatesContainer}>
        <p className={styles.selectedDatesTitle}>Fechas seleccionadas</p>
        <div className={styles.textDates}>
          <div>
            <span>Fecha de inicio:</span> {formatDate(minDate)}
          </div>
          <div>
            <span>Fecha de fin:</span> {formatDate(maxDate)}
          </div>
          <div>
            <span>Días totales de renta:</span> {totalRentalDays} días
          </div>
        </div>
        <div className={styles.buttonTextDates}>
          <button className={styles.buttonCalendar}>Iniciar reserva</button>
        </div>
      </div>
    </div>
  );
};

export default SelectedDates;