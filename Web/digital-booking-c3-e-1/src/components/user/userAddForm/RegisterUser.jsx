import React, { useState, useEffect } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./RegisterUser.module.css";
import AuthService from "../../../shared/services/AuthService";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import Swal from 'sweetalert2';




const PasswordInput = ({ isVisible, setIsVisible, ...restProps }) => (
  <div style={{ position: "relative" }}>
    <InputWithLabel type={isVisible ? "text" : "password"} {...restProps} />
    <button
      class="isible"
      type="button"
      onClick={() => setIsVisible(!isVisible)}
      style={{
        position: "absolute",
        right: "10px",
        top: "72%",
        transform: "translateY(-50%)",
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      {isVisible ? (
        <AiOutlineEyeInvisible size={24} />
      ) : (
        <AiOutlineEye size={24} />
      )}
    </button>
  </div>
);

const RegisterUser = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    checkPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    checkPassword: "",
    terms: "",
  });

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCheckPasswordVisible, setIsCheckPasswordVisible] = useState(false);

 


  const handleSubmit = (event) => {
    event.preventDefault();

    const validateForm = () => {
      let isValid = true;
      const errors = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        checkPassword: "",
      };
      const nameRegex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ'][a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s']*$/;

      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/;

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!user.name) {
        errors.name = "El nombre es obligatorio";
        isValid = false;
      } else if (user.name.trim() !== user.name) {
        errors.name = "El nombre no debe contener espacios al principio";
        isValid = false;
      } else if (!nameRegex.test(user.name)) {
        errors.name = "El nombre contiene caracteres no válidos";
        isValid = false;
      }

      if (!user.lastName) {
        errors.lastName = "El apellido es obligatorio";
        isValid = false;
      } else if (user.lastName.trim() !== user.lastName) {
        errors.lastName = "El apellido no debe tener espacios al principio";
        isValid = false;
      } else if (!nameRegex.test(user.lastName)) {
        errors.lastName = "El apellido tiene caracteres no válidos";
        isValid = false;
      }

      if (!user.email) {
        errors.email = "El email es obligatorio";
        isValid = false;
      } else if (!emailRegex.test(user.email)) {
        errors.email = "El email no es válido";
        isValid = false;
      }

      if (!user.password) {
        errors.password = "La contraseña es obligatoria";
        isValid = false;
      } else if (user.password.trim() !== user.password) {
        errors.password = "La contraseña no debe tener espacios";
        isValid = false;
      } else if (user.password.length < 3) {
        errors.password = "La contraseña debe tener al menos 3 caracteres";
        isValid = false;
      } else if (!passwordRegex.test(user.password)) {
        errors.password =
          "La contraseña debe tener al menos una letra minúscula, una mayúscula y un número";
        isValid = false;
      }

      if (!user.checkPassword) {
        errors.checkPassword = "Debes confirmar la contraseña";
        isValid = false;
      } else if (user.checkPassword.trim() !== user.checkPassword) {
        errors.checkPassword =
          "La contraseña no debe contener espacios al principio";
        isValid = false;
      } else if (user.password !== user.checkPassword) {
        errors.checkPassword = "Las contraseñas no coinciden";
        isValid = false;
      }
      if (!isTermsChecked) {
        errors.terms = "Debes aceptar los términos y condiciones";
        isValid = false;
      }

      setFormErrors(errors);
      return isValid;
    };

    const userData = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };

    const sendUser = async () => {
      try {
       await AuthService.register(userData);
        console.log(userData);
      } catch {
        (err) => console.log(err);
      }
    };

    if (validateForm()) {
      sendUser();
    } else {
      console.log("El formulario contiene errores");
    }
  };
  

  return (
    <div className={styles.container}>
      <img className={styles["registerUser-img"]} src="/registerUser.png" alt="imagen" />
      <div>
        <h1>Registrate</h1>
        <p>
          Registrate para alquilar equipamiento deportivo de calidad y disfrutar
          de emocionantes aventuras al aire libre
        </p>
        <form className={styles["form-container"]} onSubmit={handleSubmit}>
          <InputWithLabel 
            type={"text"}
            value={user.name}
            onChange={(event) => setUser({ ...user, name: event.target.value })}
          >
            Nombre
          </InputWithLabel>

          {formErrors.name && (
            <span className={styles["form-error"]}>{formErrors.name}</span>
          )}

          <InputWithLabel
            type={"text"}
            value={user.lastName}
            onChange={(event) =>
              setUser({ ...user, lastName: event.target.value })
            }
          >
            Apellido
          </InputWithLabel>

          {formErrors.lastName && (
            <span className={styles["form-error"]}>{formErrors.lastName}</span>
          )}

          <InputWithLabel
            type={"email"}
            value={user.email}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
          >
            Email
          </InputWithLabel>

          {formErrors.email && (
            <span className={styles["form-error"]}>{formErrors.email}</span>
          )}

          <PasswordInput
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
            isVisible={isPasswordVisible}
            setIsVisible={setIsPasswordVisible}
          >
            Contraseña
          </PasswordInput>

          {formErrors.password && (
            <span className={styles["form-error"]}>{formErrors.password}</span>
          )}
          <PasswordInput
            value={user.checkPassword}
            onChange={(event) =>
              setUser({ ...user, checkPassword: event.target.value })
            }
            isVisible={isCheckPasswordVisible}
            setIsVisible={setIsCheckPasswordVisible}
          >
            Confirmación de contraseña
          </PasswordInput>
          {formErrors.checkPassword && <span>{formErrors.checkPassword}</span>}
          <br />
          <label>
            <input
              type="checkbox"
              checked={isTermsChecked}
              onChange={() => setIsTermsChecked(!isTermsChecked)}
            />
            He leído y acepto los términos y condiciones
          </label>
          <br />
          {formErrors.terms && (
            <span className={styles["form-error"]}>{formErrors.terms}</span>
          )}

          <ButtonPrimary onClick={handleSubmit}>Enviar</ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
