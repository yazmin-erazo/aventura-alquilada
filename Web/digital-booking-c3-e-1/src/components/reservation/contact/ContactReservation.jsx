import React, { useState, useEffect } from "react";
import InputWithLabel from "../../../components/common/input/InputWithLabel";
import styles from "./ContactReservation.module.css";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineMail } from "react-icons/md";

const ContactReservation = ({
  user,
  isSubscribe,
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
      <div className={styles.header}>
        <div>
          <MdOutlineMail className={styles.headerIcon}/>{" "}
        </div>
        <h3 className={styles.title}>Datos de contacto</h3>
      </div>
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
                isEditable={false}
              >
                Nombre
              </InputWithLabel>
            </div>
            <div className={styles.inputContainer}>
              <InputWithLabel
                value={user.lastname}
                onChange={handleLastNameChange}
                label="Apellidos"
                isEditable={false}
              >
                Apellido
              </InputWithLabel>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <InputWithLabel
              className={styles.emailInput}
              value={user.sub}
              onChange={handleEmailChange}
              label="Email"
              isEditable={false}
            >
              Email
            </InputWithLabel>
          </div>
        </div>
      )}
      {(showAdditionalForm || additionalContact) && (
        <div className={styles.additionalFormContainer}>
          <h4>Segundo contacto</h4>
          <div className={styles.containerNameLastName}>
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
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.emailInput}>
              <InputWithLabel
                value={additionalEmail}
                onChange={handleAdditionalEmailChange}
                label="Email (Segundo Contacto)"
                style={{ maxWidth: "100%" }}
              >
                Email (Segundo contacto)
              </InputWithLabel>
            </div>
          </div>
        </div>
      )}
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="subscribeCheckbox"
          checked={isSubscribe}
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
        {showAdditionalForm || additionalContact ? (
          <>
            <FiMinusCircle className={styles.icon} />
            <span>Eliminar segundo contacto</span>
          </>
        ) : (
          <>
            <BsPlusCircle className={styles.icon} />
            <span>Agregar segundo contacto</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ContactReservation;
