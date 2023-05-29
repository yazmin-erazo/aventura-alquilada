import React, { useState } from 'react';
import InputWithLabel from '../../common/input/InputWithLabel';
import styles from './Login.module.css'
import ButtonPrimary from '../../common/Buttons/ButtonPrimary';
import { useForm } from "react-hook-form";
import ValidationService from '../../../shared/services/ValidationService';
import AuthService from '../../../shared/services/AuthService';

const Login = () => {

    const [userData, setUserData] = useState({
      email: "",
      pass: ""
    });
  
    const { register, handleSubmit, formState: {errors} } = useForm({mode: "onChange"});

    const onSubmitHandler = async (data) => {
      setUserData(data);
      await AuthService.login(userData);
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
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <InputWithLabel type = {"text"} {...register("email", {
            required: ValidationService.errorMessages.req,
            pattern: {
              value: ValidationService.patterns.email,
              message: ValidationService.errorMessages.email
            }
          })} name="email" value={userData.email}>Email</InputWithLabel>
          {errors.email && errors.email.message}
          <InputWithLabel type={"password"} {...register("pass",{
            required: ValidationService.errorMessages.req,
            pattern: {
              value: ValidationService.patterns.pass,
              message: ValidationService.errorMessages.pass
            }
          })} name="pass" value={userData.pass}>Contraseña</InputWithLabel>
          {errors.pass && errors.pass.message}
          <ButtonPrimary type="submit">Iniciar Sesión</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default Login