import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./CalendarProducts.module.css";
import "react-calendar/dist/Calendar.css";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import RentsService from "../../../shared/services/RentsService";
import moment from "moment";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale("es", es);
setDefaultLocale("es");

const CalendarProducts = ({ onSelectDates }) => {
  const [rents, setRents] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalRentalDays, setTotalRentalDays] = useState(0);



  const fetchRents = async () => {
      try {
          const data = await RentsService.getAll();
          console.log("Rentas obtenidas:", data);
          setRents(data);
        } catch (err) {
            console.log(`Error al obtener las rentas: ${err}`);
        }
    };
    
    useEffect(() => {
        fetchRents();
    }, []);
    console.log(rents);

  console.log(rents);

  const isDateUnavailable = (date) => {
    return rents.some((rent) => {
      const startDate = moment(rent.starDate, "YYYY-MM-DD").startOf("day");
      const endDate = moment(rent.endDate, "YYYY-MM-DD").startOf("day");
      return date >= startDate && date <= endDate;
    });
  };


  const getTileClassName = (date) => {
    if (
      selectedStartDate &&
      selectedEndDate &&
      date >= selectedStartDate &&
      date <= selectedEndDate
    ) {
      return "selected-date";
    }
    if (isDateUnavailable(date)) {
      return "unavailable-date";
    }
    return "available-date";
  };

  const handleDateSelect = (date) => {
    const selectedDate = moment(date).startOf("day");
  
    if (selectedEndDate) {
      if (selectedDate > selectedEndDate) {
        setSelectedStartDate(selectedEndDate);
        setSelectedEndDate(selectedDate);
      } else {
        setSelectedStartDate(selectedDate);
      }
    } else if (!selectedStartDate) {
      setSelectedStartDate(selectedDate);
    } else {
      setSelectedEndDate(selectedDate);
      const diffDays = Math.abs(selectedDate.diff(selectedStartDate, 'days')) + 1;
      setTotalRentalDays(diffDays);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };


  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const diffDays = Math.abs(selectedEndDate.diff(selectedStartDate, "days")) + 1;
      setTotalRentalDays(diffDays);
    } else {
      setTotalRentalDays(0);
    }
  }, [selectedStartDate, selectedEndDate]);

  const showButton = selectedStartDate && selectedEndDate;

  useEffect(() => {
    if (onSelectDates) {
      onSelectDates(selectedStartDate, selectedEndDate);
    }
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div>
      <div className={styles.containerCalendar}>
        <div className={styles.section}>
          <Calendar
            locale="es"
            showDoubleView
            minDate={new Date()}
            tileClassName={({ date }) => getTileClassName(date)}
            tileDisabled={({ date }) => isDateUnavailable(date)}
            onClickDay={handleDateSelect}
          />
        </div>

        <div className={styles.section}>
          <div className={styles.selectedDates}>
            {showButton && (
              <div>
                <p className={styles.selectedDatesTitle}>
                  Estas son las fechas seleccionadas
                </p>
                <div className={styles.textDates}>
                  <div>
                    <span>Fecha de inicio:</span>{" "}
                    {formatDate(selectedStartDate)}
                  </div>
                  <div>
                    <span>Fecha de fin:</span> {formatDate(selectedEndDate)}
                  </div>
                  <div>
    <span>Días totales de renta:</span> {totalRentalDays}
  </div>
                </div>
                <div className={styles.buttonTextDates}>
                  <ButtonPrimary>Iniciar reserva</ButtonPrimary>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarProducts;
