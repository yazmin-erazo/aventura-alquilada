import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../../context/ProductsContext";
import styles from "./NewReservation.module.css";
import Reservation from "../Reservation";

const NewReservation = () => {
  const params = useParams();
  const data = useContext(ProductsContext);
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (startDate) => {
    setSelectedStartDate(startDate);
  };

  const handleEndDateChange = (endDate) => {
    setSelectedEndDate(endDate);
  };

  const handleSelectDates = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };
  const [active, setActive] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const changeStep = (param) => {
    switch (param) {
      case "NEXT":
        setStep(step + 1);
        if (active.step2) setActive({ step1: true, step2: true, step3: true });
        else setActive({ step1: true, step2: true, step3: false });
        break;
      case "PREV":
        setStep(step - 1);
        if (active.step3) setActive({ step1: true, step2: true, step3: false });
        else setActive({ step1: true, step2: false, step3: false });
        break;
      default:
        console.log("entraste a nada");
        break;
    }
  };

  useEffect(() => {
    const prod = data.products.find((p) => p.id === parseInt(params.id));
    setProduct(prod);
    const dates = JSON.parse(sessionStorage.getItem("dates"));
    if (dates) {
      setStartDate(dates.startDate);
      setEndDate(dates.endDate);
    }
    const u = JSON.parse(sessionStorage.getItem("user"));
    setUser(u);
  }, [data]);

  useEffect(() => {
    setCalendarOpen(false);
  }, [selectedEndDate]);

  const toggleCalendar = (e) => {
    e.preventDefault();
    setCalendarOpen(!isCalendarOpen);
  };

  return (
    <>
      <div className={styles.stepsContainer} data-testid="reservation-component">
        <div className={`${styles.step} ${active.step1 && styles.stepActive}`}>
          {" "}
          1{" "}
        </div>
        <div className={`${styles.step} ${active.step2 && styles.stepActive}`}>
          {" "}
          2{" "}
        </div>
        <div className={`${styles.step} ${active.step3 && styles.stepActive}`}>
          {" "}
          3{" "}
        </div>
      </div>
      <Reservation
        product={product}
        startDate={startDate}
        endDate={endDate}
        user={user}
        changeStep={changeStep}
        step={step}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        toggleCalendar={toggleCalendar}
        isCalendarOpen={isCalendarOpen}
        handleSelectDates={handleSelectDates}
      />
    </>
  );
};

export default NewReservation;
