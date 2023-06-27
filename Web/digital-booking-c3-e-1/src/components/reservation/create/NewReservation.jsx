import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../../context/ProductsContext";
import styles from "./NewReservation.module.css";
import ReservationDetails from "../reservationDetails/ReservationDetails";
import Reservation from "../Reservation";

const NewReservation = () => {
  const params = useParams();
  const data = useContext(ProductsContext);
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
    const u = JSON.parse(sessionStorage.getItem("user"));
    setUser(u);
  }, [data]);

  return (
    <>
      <div className={styles.stepsContainer}>
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
      />
    </>
  );
};

export default NewReservation;
