import React, { useContext, useEffect, useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import styles from "./Login.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import AuthService from "../../../shared/services/AuthService";
import ValidationService from "../../../shared/services/ValidationService";
import { UserContext } from "../../../context/AuthContext";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../common/input/PasswordInput";

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

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
      } else if (
        userData.password.trim().length < 3 !== userData.password &&
        !ValidationService.patterns.pass.test(userData.password)
      ) {
        errors.password = ValidationService.errorMessages.pass;
        isValid = false;
      }

      setErrors(errors);
      return isValid;
    };

    validateForm();

    const logIn = async () => {
      Swal.fire({
        title: "Iniciando sesión",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const data = await AuthService.login(userData);
      if (data) {
        const user = jwtDecode(data.response.jwt);
        dispatch({
          type: "LOGIN",
          payload: { token: data.response.jwt, user: user },
        });
        navigate("/");
      }
    };

    if (isValid) logIn();
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          src="https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/LoginPic.png"
          alt="Hombre escalando"
        />
      </div>
      <div className={styles.containerForm}>
        <div className={styles.form}>
          <h2>¡Listo para un nuevo desafío!</h2>
          <hr />
          <p className={styles.textLogin}>
            Encuentra todo lo que necesitas para hacer de tu próxima experiencia
            deportiva una increíble aventura
          </p>
          <form>
            <InputWithLabel
              type={"text"}
              placeholder={"Ingrese su email"}
              name="email"
              onChange={(event) =>
                setUserData({ ...userData, email: event.target.value })
              }
              error={errors.email}
            >
              Email
            </InputWithLabel>
            
            <PasswordInput
              value={userData.password}
              placeholder={"Ingrese su contraseña"}
              onChange={(event) =>
                setUserData({ ...userData, password: event.target.value })
              }
              isVisible={isPasswordVisible}
              setIsVisible={setIsPasswordVisible}
              right="180px"
              error={errors.password}
            >
              Contraseña
            </PasswordInput>
            
            <div className={styles.containerButton}>
              <ButtonPrimary onClick={onSubmitHandler}>
                Iniciar Sesión
              </ButtonPrimary>
            </div>
          </form>
          <div className={styles.message}>
            Si no tiene un usuario regístrese <Link to={"/auth/register"}>aquí</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
