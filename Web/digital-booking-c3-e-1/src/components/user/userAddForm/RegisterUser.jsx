import React, { useState, useEffect } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./registerUser.module.css";
import AuthService from "../../../shared/services/AuthService";

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
  });

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

      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
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
        errors.lastName = "El apellido no debe contener espacios al principio";
        isValid = false;
      } else if (!nameRegex.test(user.lastName)) {
        errors.lastName = "El apellido contiene caracteres no válidos";
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
        errors.password = "La contraseña no debe contener espacios";
        isValid = false;
      } else if (user.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
        isValid = false;
      } else if (!passwordRegex.test(user.password)) {
        errors.password = "La contraseña debe contener letras y números";
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
        AuthService.register(userData);
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
      <img src="/registerUser.png" alt="imagen" />
      <div>
        <h1>Registrate</h1>
        <p>
          Registrate para alquilar equipamiento deportivo de calidad y disfutar
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

          <InputWithLabel
            type={"password"}
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          >
            Contraseña
          </InputWithLabel>

          {formErrors.password && (
            <span className={styles["form-error"]}>{formErrors.password}</span>
          )}

          <InputWithLabel
            type={"password"}
            value={user.checkPassword}
            onChange={(event) =>
              setUser({ ...user, checkPassword: event.target.value })
            }
          >
            Confirmación de contraseña
          </InputWithLabel>

          {formErrors.checkPassword && <span>{formErrors.checkPassword}</span>}

          <ButtonPrimary onClick={handleSubmit}>Enviar</ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
