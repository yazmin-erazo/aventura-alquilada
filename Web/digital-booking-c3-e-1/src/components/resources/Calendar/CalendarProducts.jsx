import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import "react-calendar/dist/Calendar.css";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useParams, useNavigate } from "react-router-dom";
import RentsService from "../../../shared/services/RentsService";
import moment from "moment";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale("es", es);
setDefaultLocale("es");

const CalendarProducts = () => {
  const [rents, setRents] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

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
    if (selectedEndDate) {
      setSelectedStartDate(moment(date).startOf("day"));
      setSelectedEndDate(null);
    } else if (!selectedStartDate) {
      setSelectedStartDate(moment(date).startOf("day"));
    } else {
      setSelectedEndDate(moment(date).startOf("day"));
    }
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const showButton = selectedStartDate && selectedEndDate;

  return (
    <div>
      <p> Fechas disponibles </p>
      <div>
        <div>
          <Calendar
            locale="es"
            showDoubleView
            minDate={new Date()}
            tileClassName={({ date }) => getTileClassName(date)}
            tileDisabled={({ date }) => isDateUnavailable(date)}
            onClickDay={handleDateSelect}
          />
        </div>

        <div>
          <div>
            {showButton && (
              <div>
                <p>
                  Fecha de inicio: {formatDate(selectedStartDate)}
                  <br />
                  Fecha de fin: {formatDate(selectedEndDate)}
                </p>
                <ButtonPrimary>Iniciar reserva</ButtonPrimary>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarProducts;