import React, { useState } from 'react';
import InputWithLabel from '../../common/input/InputWithLabel';
import styles from './Login.module.css'
import ButtonPrimary from '../../common/Buttons/ButtonPrimary';

const Login = () => {

    const [userData, setUserData] = useState({
      email: "",
      pass: ""
    });

    const onSubmitHandler = () => {

    }

  return (
    <div className={styles.container}>
      <div>
        <img src="/LoginPic.png" alt="Hombre escalando" />
      </div>
      <div className={styles.form}>
        <h2>¡Listo para un nuevo desafío!</h2>
        <hr />
        <p>Encuentra todo lo que necesitas para hacer de tu próxima experiencia deportiva una increíble aventura</p>
        <form>
          <InputWithLabel type = {"text"} onChange={ e => {
            setUserData(...userData, userData.email = e.target.value)
          }} value={userData.email}>Email</InputWithLabel>
          <InputWithLabel type={"password"} onChange={ e => {
            setUserData(...userData, userData.pass = e.target.value)
          }} value={userData.pass}>Contraseña</InputWithLabel>
          <ButtonPrimary>Iniciar Sesión</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default Login