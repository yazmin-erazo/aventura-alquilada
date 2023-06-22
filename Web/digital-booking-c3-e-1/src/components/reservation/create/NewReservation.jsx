import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../../context/ProductsContext';
import styles from './NewReservation.module.css'
import ReservationDetails from '../reservationDetails/ReservationDetails';

const NewReservation = () => {

  const params = useParams();
  const data = useContext(ProductsContext);
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [active, setActive] = useState({
    step1: true,
    step2: false,
    step3: false
  })
  const [user, setUser] =useState(null)


  useEffect(() => {
    const prod = data.products.find( p => p.id === parseInt(params.id));
    setProduct(prod);
    const dates = JSON.parse(sessionStorage.getItem("dates"));
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
    const u = JSON.parse(sessionStorage.getItem("user"));
    setUser(u);
  },[])

  return (
    <>
      <div className={styles.stepsContainer}>
        <div className={`${styles.step} ${active.step1 && styles.stepActive}`}> 1 </div>
        <div className={`${styles.step} ${active.step2 && styles.stepActive}`}> 2 </div>
        <div className={`${styles.step} ${active.step3 && styles.stepActive}`}> 3 </div>
      </div>
      <ReservationDetails product={product} startDate={startDate} endDate={endDate} user={user} />
    </>
  )
}

export default NewReservation