import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AuthService from '../../../shared/services/AuthService';
import styles from './ActivateUser.module.css'

const ActivateUser = () => {

    const [params] = useSearchParams();
    const token = params.get('token')
    const [response, setResponse] = useState();

    useEffect( () => {
        const callingAPI = async () =>{
            try{ 
              const res = await AuthService.activate(`?token=${token}`);
              setResponse(res)
            }
            catch (err) {
              setResponse(err.response);
            }
        };
        callingAPI();
    }, []
    )

  return (
    <>
     { response && (response.status == 200 ? <div> <h1>¡Activación exitosa!</h1>    <p>Tu cuenta ha sido activada con éxito. Ahora puedes ingresar a <span>Digital</span> <span>Booking</span> y disfrutar de nuestros servicios.</p></div> : <div className={styles.card}> {( response.status == 500 ? "Ha ocurrido un error de servidor" : response.data.mensaje)} </div>)}
    </>
  )
}

export default ActivateUser;