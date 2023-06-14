import React from 'react'
import {DateRangePicker} from 'react-date-range'
import './CalendarProducts.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

// const CalendarProducts = () => {

//     const handleSelect = (ranges) => {
//         console.log(ranges);
//     }
//     const selectionRange = {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: 'selection',
//     }


//   return (
//         <DateRangePicker
//         months={2}
//         ranges={[selectionRange]}
//         onChange={handleSelect}
//         />
//     )
// }

import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./CalendarProducts.module.css";
import 'react-calendar/dist/Calendar.css';
import React from "react";
import Calendar from "react-calendar";
import { useEffect, useState, useContext } from "react";
import {useParams, useNavigate } from "react-router-dom";
import { RentsContext } from "../../../context/RentsContext";
import moment from "moment";


const CalendarProducts = () => {
  const data = useContext(RentsContext);
  const [rents, setRents] = useState([]);

 useEffect(() => {
    setRents(data);
  }, [data]);

  //por el momento se usa este array porque no hay reservas aun luego toca modificar 
  const unavailableDates = [
    {
        start: '2023-06-12',
        end: '2023-06-18',
    },
    {
        start: '2023-07-04',
        end: '2023-07-07',
    },
    {
        start: '2023-08-20',
        end: '2023-08-25',
    }]

    const isDateUnavailable = (date) => {
      return unavailableDates.some((range) => {
        const { startDate, endDate } = range;
        return date >= startDate && date <= endDate;
      });
    };
//esto para poder diferenciar disponible de no y darle estilo

    const getTileClassName = (date) => {
      if (isDateUnavailable(date)) {
        return 'unavailable-date';
      }
      return 'available-date';
    };

  /*const box = []; // contiene objetos Date

  rents.forEach((rent) => {
    const checkout = moment(rent.checkOut);
    let fecha = moment(rent.checkIn);

    do {
      box.push(fecha.clone());
      fecha.add(1, "days");
    } while (fecha.isSameOrBefore(checkout));
  
  });*/

    return (
         <div className={styles.calendar}>
           <p> Fechas disponibles </p>
            <div className= {styles.container}>
              <div className= {styles.group}>
                <Calendar className={styles.custom}
                 calendarType='US'
                 showDoubleView 
                 minDate= {new Date()}
                 tileClassName={({ date }) => getTileClassName(date)}
                 tileDisabled={({ date }) => isDateUnavailable(date)}
                // tileDisabled={({ date }) =>rents.some(rent => isSameDay(rent, date))}
                />
              </div>
              
              <div className={styles.buttonCalendar}>
                <div>
                  <p> Agregá tus fechas de alquiler </p>
                  <ButtonPrimary>
                    Iniciar reserva
                  </ButtonPrimary>  
                </div>
             </div>
            </div>
          </div>
      );
    };
    
      export default CalendarProducts; 
