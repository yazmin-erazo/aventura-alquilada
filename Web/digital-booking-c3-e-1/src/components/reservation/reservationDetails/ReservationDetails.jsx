import React from 'react';
import styles from './ReservationDetails.module.css'

const ReservationDetails = ({product, startDate, endDate, user}) => {
  return (
    <div className={styles.container}><h1>ReservationDetails</h1>
        {console.log(product)}
        {`${startDate} ${endDate}`}
        {console.log(user)}
    </div>
  )
}

export default ReservationDetails