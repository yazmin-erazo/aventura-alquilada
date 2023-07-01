import React, { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import { es } from "date-fns/locale";

registerLocale("es", es);
setDefaultLocale("es");

const PruebaCalendar = ({ onSelectDates, rents }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalRentalDays, setTotalRentalDays] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const isDateUnavailable = (date) => {
    if (rents) {
      return rents.some((rent) => {
        const startDate = new Date(rent.starDate);
        const endDate = new Date(rent.endDate.split("T")[0]);

        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 2);

        const isUnavailable =
          date >= startDate && date <= endDate && !rent.disabled;
        return isUnavailable;
      });
    }
    return false;
  };

  const handleSelectDates = () => {
    if (selectedDates.length === 2) {
      const startDate = selectedDates[0].toDate();
      const endDate = selectedDates[1].toDate();
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate, endDate);

      if (onSelectDates) {
        onSelectDates(startDate, endDate);
      }
    }
  };

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      let diffDays = 0;
      let currentDate = new Date(selectedStartDate.getTime()); // Clona la fecha de inicio para no modificarla directamente

      while (currentDate <= selectedEndDate) {
        if (!isDateUnavailable(currentDate)) {
          diffDays++;
        } else {
          Swal.fire(
            "Fechas no disponibles",
            "Seleccione otro rango de fechas para reservar ",
            "error"
          );
          setSelectedStartDate(null);
          setSelectedEndDate(null);
          setTotalRentalDays(0);
          return;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setTotalRentalDays(diffDays);
    } else {
      setTotalRentalDays(0);
    }
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (onSelectDates && selectedStartDate && selectedEndDate) {
      onSelectDates(selectedStartDate, selectedEndDate);
    }
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    handleSelectDates();
  }, [selectedDates]);

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

  return (
    <div>
      <Calendar
        range
        rangeHover
        arrowClassName="custom-arrow"
        value={selectedDates}
        className="rmdp-mobile"
        numberOfMonths={isMobile ? 1 : 2}
        containerStyle={{
          width: "auto",
        }}
        plugins={isMobile || window.innerWidth < 500 ? [ <DatePickerHeader 
            position="top" 
            size="small" 
          />] : [<DatePickerHeader />]}
        weekStartDayIndex={1}
        onChange={handleDateSelect}
        selectedDates={selectedDates}
        minDate={new Date()}
        tileClassName={({ date }) => getTileClassName(date)}
        mapDays={({ date }) => {
          const isUnavailable = isDateUnavailable(date);
          if (isUnavailable) {
            return {
              disabled: true,
              style: { color: "#ccc" },
            };
          }
        }}
      />
      {/* <div>Selected Dates: {selectedDates.join(" ~ ")}</div> */}
    </div>
  );
};

export default PruebaCalendar;
