import React, { useState, useEffect } from "react";
import InputWithLabel from "../../../components/common/input/InputWithLabel";
import styles from "./ContactReservation.module.css";

const ContactReservation = ({
  user,
  subscribe,
  handleSubscribeChange,
  onNameChange,
  onLastNameChange,
  onEmailChange,
  onAdditionalContactChange,
  additionalContact,
}) => {
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [additionalName, setAdditionalName] = useState("");
  const [additionalLastName, setAdditionalLastName] = useState("");
  const [additionalEmail, setAdditionalEmail] = useState("");

  useEffect(() => {
    if (additionalContact) {
      setAdditionalName(additionalContact.name || "");
      setAdditionalLastName(additionalContact.lastName || "");
      setAdditionalEmail(additionalContact.email || "");
    }
  }, [additionalContact]);

  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  const handleLastNameChange = (e) => {
    onLastNameChange(e.target.value);
  };

  const handleEmailChange = (e) => {
    onEmailChange(e.target.value);
  };

  const handleAdditionalNameChange = (e) => {
    const name = e.target.value;
    setAdditionalName(name);
    onAdditionalContactChange({
      ...additionalContact,
      name: name,
    });
  };

  const handleAdditionalLastNameChange = (e) => {
    const lastName = e.target.value;
    setAdditionalLastName(lastName);
    onAdditionalContactChange({
      ...additionalContact,
      lastName: lastName,
    });
  };

  const handleAdditionalEmailChange = (e) => {
    const email = e.target.value;
    setAdditionalEmail(email);
    onAdditionalContactChange({
      ...additionalContact,
      email: email,
    });
  };

  const handleToggleAdditionalForm = () => {
    if (additionalContact) {
      setAdditionalName("");
      setAdditionalLastName("");
      setAdditionalEmail("");
      onAdditionalContactChange(null);
    }
    setShowAdditionalForm(!showAdditionalForm);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Datos de contacto</h3>
      <div className={styles.description}>
        <p>
          Utilizaremos esta información para enviarte la confirmación y
          novedades acerca de tu reserva.
        </p>
      </div>
      {user && (
        <div className={styles.userContainer}>
          <div className={styles.containerNameLastName}>
            <div className={styles.inputContainer}>
              <InputWithLabel
                value={user.name}
                onChange={handleNameChange}
                label="Nombre"
              >
                Nombre
              </InputWithLabel>
            </div>
            <div className={styles.inputContainer}>
              <InputWithLabel
                value={user.lastname}
                onChange={handleLastNameChange}
                label="Apellidos"
              >
                Apellido
              </InputWithLabel>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <InputWithLabel
              value={user.sub}
              onChange={handleEmailChange}
              label="Email"
            >
              Email
            </InputWithLabel>
          </div>
        </div>
      )}
      {(showAdditionalForm || additionalContact) && (
        <div className={styles.additionalFormContainer}>
          <h4>Segundo contacto</h4>
          <div className={styles.inputContainer}>
            <InputWithLabel
              value={additionalName}
              onChange={handleAdditionalNameChange}
              label="Nombre (Segundo Contacto)"
            >
              Nombre (Segundo contacto)
            </InputWithLabel>
          </div>
          <div className={styles.inputContainer}>
            <InputWithLabel
              value={additionalLastName}
              onChange={handleAdditionalLastNameChange}
              label="Apellidos (Segundo Contacto)"
            >
              Apellido (Segundo contacto)
            </InputWithLabel>
          </div>
          <div className={styles.inputContainer}>
            <InputWithLabel
              value={additionalEmail}
              onChange={handleAdditionalEmailChange}
              label="Email (Segundo Contacto)"
            >
              Email (Segundo contacto)
            </InputWithLabel>
          </div>
        </div>
      )}
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="subscribeCheckbox"
          checked={subscribe}
          onChange={handleSubscribeChange}
          className={styles.checkbox}
        />
        <label htmlFor="subscribeCheckbox" className={styles.checkboxLabel}>
          Me gustaría recibir notificaciones y promociones relacionadas con el
          equipamiento y actividades.
        </label>
      </div>
      <button
        type="button"
        onClick={handleToggleAdditionalForm}
        className={`${styles.button} ${
          showAdditionalForm || additionalContact
            ? styles.deleteButton
            : styles.addButton
        }`}
      >
        {showAdditionalForm || additionalContact
          ? "Eliminar segundo contacto"
          : "Agregar segundo contacto"}
      </button>
    </div>
  );
};

export default ContactReservation;
