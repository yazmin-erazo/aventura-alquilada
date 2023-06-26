import React, { useState } from 'react';
import styles from './ReservationDetails.module.css'
import InputWithLabel from '../../common/input/InputWithLabel';
import RentsService from '../../../shared/services/RentsService';
import Swal from 'sweetalert2';

const ReservationDetails = ({product, startDate, endDate, user, disabled, changeStep, step}) => {

    const handleSubmit = e => {
        e.preventDefault();
        if(step !==3)
            changeStep('NEXT');
        else
            reserve();     
    }

    const reserve = async () => {
        const datos = {userId: user.iduser, productId: product.id, starDate: startDate, endDate: endDate}
        const res = await RentsService.create(datos)
        console.log(res);
        if(res.status === 201)
            Swal.fire("¡Muchas gracias!", "La reserva se ha efectuado con éxito. Recibirá un mail con los datos", "success");
    }

    const back = () => {
        changeStep('PREV')
    }
    console.log(product);

  return (
    <div className={styles.container}><h1>Datos de su reserva</h1>

        <form onSubmit={handleSubmit}>
            {/* <InputWithLabel value={product.name}>Producto</InputWithLabel> */}
            <button type='submit'>{step !== 3 ? "Siguiente" : "Confirmar"}</button>
        </form>
            {step !== 1 && <button onClick={back}>Volver</button>}
    </div>
  )
}

export default ReservationDetails