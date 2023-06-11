import React, { useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./RegisterUser.module.css";
import AuthService from "../../../shared/services/AuthService";
import Swal from "sweetalert2";
import PasswordInput from "../../common/input/PasswordInput";

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
  const [showResendMessage, setShowResendMessage] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

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
        errors.name = "Por favor, ingresa un nombre de al menos 3 caracteres";
        isValid = false;
      } else {
        const trimmedName = user.name.trim(); // Elimina los espacios al principio y al final
        if (!nameRegex.test(trimmedName)) {
          errors.name = "El nombre contiene caracteres no válidos";
          isValid = false;
        } else {
          setUser({ ...user, name: trimmedName }); // Luego con esto Actualizamos el estado con el valor sin espacios
        }
      }

      if (!user.lastName) {
        errors.lastName = "Por favor, completa tu apellido";
        isValid = false;
      } else {
        const trimmedLastName = user.lastName.trim(); 
        if (!nameRegex.test(trimmedLastName)) {
          errors.lastName = "El apellido tiene caracteres no válidos";
          isValid = false;
        } else {
          setUser({ ...user, lastName: trimmedLastName }); 
        }
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
        setIsEmailSent(true);
        console.log(userData);
      } catch (err) {
        console.log(err);
      }
    };

    if (validateForm()) {
      sendUser();
    } else {
      console.log("El formulario contiene errores");
    }
  };

  const handleResendEmail = async () => {
    try {
      const response = await AuthService.resendEmail(
        encodeURIComponent(user.email)
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Correo de activación reenviado",
          text: "El correo de activación ha sido reenviado exitosamente.",
        }).then((result) => {});
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al reenviar el correo de activación",
          text: "Ha ocurrido un error al reenviar el correo de activación. Por favor, intenta nuevamente más tarde.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al reenviar el correo de activación",
        text: "Ha ocurrido un error al reenviar el correo de activación. Por favor, intenta nuevamente más tarde.",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          className={styles["registerUser-img"]}
          src="https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/registerUser.png"
          alt="imagen"
        />
      </div>
      <div className={styles.containerForm}>
        <div className={styles["form"]}>
          <h2>Registrate</h2>
          <hr />
          <p className={styles["text-register"]}>
            Registrate para alquilar equipamiento deportivo de calidad y
            disfrutar de emocionantes aventuras al aire libre
          </p>
          <form className={styles["form-container"]} onSubmit={handleSubmit}>
            <InputWithLabel
              type={"text"}
              placeholder={"Ingresa nombre"}
              value={user.name}
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
              error={formErrors.name}
            >
              Nombre
            </InputWithLabel>

            <InputWithLabel
              type={"text"}
              placeholder={"Ingresa apellido"}
              value={user.lastName}
              onChange={(event) =>
                setUser({ ...user, lastName: event.target.value })
              }
              error={formErrors.lastName}
            >
              Apellido
            </InputWithLabel>

            <InputWithLabel
              type={"email"}
              placeholder={"Ingrese su email"}
              value={user.email}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
              error={formErrors.email}
            >
              Email
            </InputWithLabel>

            <PasswordInput
              value={user.password}
              placeholder={"Ingrese una contraseña segura"}
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
              isVisible={isPasswordVisible}
              setIsVisible={setIsPasswordVisible}
              error={formErrors.password}
            >
              Contraseña
            </PasswordInput>

            <PasswordInput
              value={user.checkPassword}
              placeholder={"Confirme su contraseña"}
              onChange={(event) =>
                setUser({ ...user, checkPassword: event.target.value })
              }
              isVisible={isCheckPasswordVisible}
              setIsVisible={setIsCheckPasswordVisible}
              error={formErrors.checkPassword}
            >
              Confirmación de contraseña
            </PasswordInput>

            <br />
            <div className={styles.termsConditions}>
              <label>
                <input
                  type="checkbox"
                  checked={isTermsChecked}
                  onChange={() => setIsTermsChecked(!isTermsChecked)}
                />
                He leído y acepto los términos y condiciones
              </label>
              <div>
                {formErrors.terms && (
                  <span className={styles["form-error"]}>
                    {formErrors.terms}
                  </span>
                )}
              </div>
            </div>

            <ButtonPrimary onClick={handleSubmit}>Enviar</ButtonPrimary>
          </form>
          {isEmailSent && !showResendMessage && (
            <div className={styles["button-register-container"]}>
              <p>
                Si no recibiste el correo de activación, por favor, haz clic{" "}
                <button
                  className={styles["button-register"]}
                  onClick={handleResendEmail}
                >
                  aquí
                </button>{" "}
                para reenviarlo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
