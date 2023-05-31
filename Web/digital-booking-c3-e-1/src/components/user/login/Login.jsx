import React, { useContext, useEffect, useState } from 'react';
import InputWithLabel from '../../common/input/InputWithLabel';
import styles from './Login.module.css'
import ButtonPrimary from '../../common/Buttons/ButtonPrimary';
import AuthService from '../../../shared/services/AuthService';
import ValidationService from '../../../shared/services/ValidationService';
import { UserContext } from '../../../context/AuthContext';
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '../userAddForm/RegisterUser';

const Login = () => {

  const { dispatch } = useContext(UserContext)
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  const onSubmitHandler = (e) => {
    e.preventDefault()
    
    let isValid = true;
    const errors = {
      email: "",
      password: "",
    };
    const validateForm = () => {
      
      if (!userData.email) {
        errors.email = ValidationService.errorMessages.req;
        isValid = false;
      } else if (!ValidationService.patterns.email.test(userData.email)) {
        errors.email = ValidationService.errorMessages.email;
        isValid = false;
      }

      if (!userData.password) {
        errors.password = ValidationService.errorMessages.req;
        isValid = false;
      } else if (userData.password.trim().length < 3 !== userData.password && !ValidationService.patterns.pass.test(userData.password)) {
      errors.password = ValidationService.errorMessages.pass;
      isValid = false;
    }
    
    setErrors(errors)
    return isValid;
  }
  
  
  
  validateForm()
  
  const logIn = async () => {
      Swal.fire({
        title: 'Iniciando sesión',
        didOpen: () => { Swal.showLoading() }
      })
      const data = await AuthService.login(userData);
      if (data) {
        const user = jwtDecode(data.response.jwt);
        dispatch({ type: "LOGIN", payload: { token: data.response.jwt, user: user } })
        navigate('/')
      }
    }

    if (isValid)
      logIn();
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
          <InputWithLabel type={"text"} name="email" onChange={(event) => setUserData({ ...userData, email: event.target.value })}>Email</InputWithLabel>
          {errors.email && (
            <span className={styles["form-error"]}>{errors.email}</span>
          )}
          <PasswordInput
            value={userData.password}
            onChange={(event) =>
              setUserData({ ...userData, password: event.target.value })
            }
            isVisible={isPasswordVisible}
            setIsVisible={setIsPasswordVisible}
          >
            Contraseña
          </PasswordInput>
          {errors.password && (
            <span className={styles["form-error"]}>{errors.password}</span>
          )}
          <ButtonPrimary onClick={onSubmitHandler}>Iniciar Sesión</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default Login