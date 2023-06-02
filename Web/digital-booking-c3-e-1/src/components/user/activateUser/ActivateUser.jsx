import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthService from '../../../shared/services/AuthService';
import styles from './ActivateUser.module.css';

const ActivateUser = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [response, setResponse] = useState();

  useEffect(() => {
    const callingAPI = async () => {
      try {
        const res = await AuthService.activate(`?token=${token}`);
        setResponse(res);
      } catch (err) {
        setResponse(err.response);
      }
    };
    callingAPI();
  }, []);

  return (
    <>
     { response && (response.status === 200 ? (
          <div style={{ backgroundColor: "#edf6ff", textAlign: "center", padding: "50px", fontFamily: "Arial, sans-serif" }}>
            <p>Hola!</p>
            <p>¡Tu cuenta ahora está disponible! Esperamos que disfrutes de nuestra plataforma y descubras todos los beneficios que tenemos para ti.</p>
            <div>
            </div>
            <p>Si tienes algún problema para acceder a tu cuenta, por favor, no dudes en ponerte en contacto con nosotros.</p>
            <p>Saludos,</p>
            <p>El equipo de <span style={{ color: "#00008B" }}>Digital</span> <span style={{ color: "#008000" }}>Booking</span></p>
          </div>
        ) : (
          <div className={styles.card}>
            {response.status === 500 ? "Ha ocurrido un error de servidor" : response.data.mensaje}
          </div>
        ))}
    </>
  );
};

export default ActivateUser;