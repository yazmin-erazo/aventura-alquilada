
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./CalendarProducts.module.css";
import 'react-calendar/dist/Calendar.css';
import React from "react";
import Calendar from "react-calendar";
import { useEffect, useState, useContext } from "react";
import {useParams, useNavigate } from "react-router-dom";
import { RentsContext } from "../../../context/RentsContext";



const CalendarProducts = () => {

    return (
        <div className={styles.calendar}>
           <p> Fechas disponibles </p>

           <div className= {styles.container}>
             
             <div className= {styles.group}>
               <Calendar className={styles.custom}
                 calendarType='US'
                 showDoubleView 
                 minDate= {new Date()}
                 tileClassName
               />
              </div>
              
              <div className={styles.buttonCalendar}>
                <div>
                  <p>
                    Agregá tus fechas de alquiler
                  </p>
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
