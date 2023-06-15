import React, { useEffect, useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-calendar/dist/Calendar.css";
import styles from "./CalendarProducts.module.css";
import { useMediaQuery } from "react-responsive";

registerLocale("es", es);
setDefaultLocale("es");

const CalendarProducts = ({ onSelectDates, rents }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalRentalDays, setTotalRentalDays] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 850 });
  

  const isDateUnavailable = (date) => {
    if(rents){
      return rents.some((rent) => {
        const startDate = moment(rent.starDate, "YYYY-MM-DD").startOf("day");
        const endDate = moment(rent.endDate, "YYYY-MM-DD").startOf("day");
        const isUnavailable =
          date >= startDate && date <= endDate && !rent.disabled;
        return isUnavailable;
      });
    }
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
      setSelectedStartDate(selectedDate);
      setSelectedEndDate(null)
      // if (selectedDate > selectedEndDate) {
      //   setSelectedStartDate(selectedEndDate);
      //   setSelectedEndDate(selectedDate);
      // } else {
      //   setSelectedStartDate(selectedDate);
      // }
    } else if (!selectedStartDate) {
      setSelectedStartDate(selectedDate);
    } else {
      setSelectedEndDate(selectedDate);
      const diffDays =
        Math.abs(selectedDate.diff(selectedStartDate, "days")) + 1;
      setTotalRentalDays(diffDays);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      let diffDays = 0;
      let currentDate = moment(selectedStartDate);

      while (currentDate <= selectedEndDate) {
        if (!isDateUnavailable(currentDate)) {
          diffDays++;
        }
        currentDate.add(1, "day");
      }

      setTotalRentalDays(diffDays);
    } else {
      setTotalRentalDays(0);
    }
  }, [selectedStartDate, selectedEndDate]);


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
            selectRange={true}
            showDoubleView={!isMobile}
            showFixedNumberOfWeeks={true}
            minDate={new Date()}
            tileClassName={({ date }) => getTileClassName(date)}
            tileDisabled={({ date }) => isDateUnavailable(date)}
            onClickDay={handleDateSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarProducts;
