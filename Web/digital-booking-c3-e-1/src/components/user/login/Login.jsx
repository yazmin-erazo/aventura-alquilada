import React, { useState } from 'react';
import InputWithLabel from '../../common/input/InputWithLabel';
import styles from './Login.module.css'
import ButtonPrimary from '../../common/Buttons/ButtonPrimary';
import AuthService from '../../../shared/services/AuthService';

const Login = () => {

    const [userData, setUserData] = useState({
      email: "",
      password: ""
    });

    const onSubmitHandler = async (e) => {
      e.preventDefault()
      try{
        const data = await AuthService.login(userData);
        sessionStorage.setItem('token', data.response.jwt);
      }
      catch{
        err => console.log(err);
      }
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
          <InputWithLabel type = {"text"} name="email" onChange={(event) => setUserData({...userData, email: event.target.value})}>Email</InputWithLabel>
          <InputWithLabel type={"password"} name="password" onChange={(event) => setUserData({...userData, password: event.target.value})}>Contraseña</InputWithLabel>
          <ButtonPrimary onClick={onSubmitHandler}>Iniciar Sesión</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default Login