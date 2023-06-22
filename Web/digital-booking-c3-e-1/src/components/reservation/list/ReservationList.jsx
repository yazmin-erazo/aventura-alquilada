import React, { useContext } from 'react'
import { RentsContext } from '../../../context/RentsContext'

const ReservationList = () => {

    const reservations = useContext(RentsContext)

  return (
    <div>ReservationList</div>
  )
}

export default ReservationList