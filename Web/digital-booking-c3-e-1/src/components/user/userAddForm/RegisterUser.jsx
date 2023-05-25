import React, { useState, useEffect } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./registerUser.module.css";
import AuthService from "../../../shared/services/AuthService"

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
      } else if (!/\S+@\S+\.\S+/.test(user.email)) {
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

    const userData={
      name:user.name, lastName: user.lastName, email:user.email, password:user.password
    }
    
        const sendUser= async()=>{
          try{
            AuthService.register(userData)
            console.log(userData);
          }
          catch{
            err=>console.log(err);
          }
        }
        
        if (validateForm()) {
      sendUser();

    } else {
      console.log("El formulario contiene errores");
    }
    

  };

  return (
    <div className= {styles.container}>
      <img src="/registerUser.png" alt="" />
      <div>
        <h2>
          Registrate
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam molestiae quisquam, consectetur vitae cum commodi! Earum, fugiat quo magni natus tempore hic nihil! Enim nam, eligendi praesentium aspernatur sunt accusantium.
        </p>
      <form className={styles["form-container"]}onSubmit={handleSubmit}>
        {/* <label className="form-label">Nombre</label>
        <input className="form-input"
          type="text"
          onChange={(event) =>
            setUser({ ...user, name: event.target.value })
          }
          
        /> */}
        <InputWithLabel type={"text"} value={user.name} onChange={(event) =>
            setUser({ ...user, name: event.target.value })
          }>
          Nombre
        </InputWithLabel>

        {formErrors.name && <span className="form-error">{formErrors.name}</span>}
        {/* <label className="form-label">Apellido</label>
        <input className="form-input"
        type="text"
        onChange={(event) =>
          setUser({ ...user, lastName: event.target.value })
        }
      /> */}
        <InputWithLabel type={"text"} value={user.lastName} onChange={(event) =>
          setUser({ ...user, lastName: event.target.value })}>
          Apellido
        </InputWithLabel>

         {formErrors.lastName && <span className="form-error">{formErrors.lastName}</span>}

{/* <label className="form-label">Email</label>
<input className="form-input"
type="email"
onChange={(event) => setUser({ ...user, email: event.target.value })} */}
 
        <InputWithLabel type={"email"}value={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })}>
          Email
        </InputWithLabel>

         {formErrors.email && <span className="form-error">{formErrors.email}</span>} 

{/* <label className="form-label">Contraseña</label>
<input className="form-input"
type="password"
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        /> */} 
        <InputWithLabel type={"password"}value={user.password} onChange={(event) =>
            setUser({ ...user, password: event.target.value })}>
          Contraseña
        </InputWithLabel>

         {formErrors.password && <span className="form-error">{formErrors.password}</span>}
        {/* <label className="form-label">Verifique la contraseña</label>
        <input className="form-input"
        type="password"
        onChange={(event) =>
          setUser({ ...user, checkPassword: event.target.value })
        }
      />  */}

        <InputWithLabel type={"password"} value={user.checkPassword} onChange={(event) =>
          setUser({ ...user, checkPassword: event.target.value })}>
          Confirmación de contraseña
        </InputWithLabel>

        {formErrors.checkPassword && <span className="form-error">{formErrors.checkPassword}</span>}

        <ButtonPrimary onClick={handleSubmit}>Enviar</ButtonPrimary>

        {/* <button className="form-submit-button">Enviar</button> */}
      </form>
      </div>
    </div>
  );
};

export default RegisterUser;
