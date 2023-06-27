import React, { useState, useEffect } from "react";
import styles from "./Reservation.module.css";
import RentsService from "../../shared/services/RentsService";
import ContactReservation from "./contact/ContactReservation";
import ConfirmReservation from "./confirm/ConfirmReservation";
import ReservationDetails from "./reservationDetails/ReservationDetails";
import moment from "moment";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import ReservationProductDetails from "./ReservationProductDetails";
import Swal from "sweetalert2";

registerLocale("es", es);
setDefaultLocale("es");

const Reservation = ({
  product,
  startDate,
  endDate,
  user,
  disabled,
  changeStep,
  step,
}) => {
  const [subscribe, setSubscribe] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState("recoger");
  const [frequency, setFrequency] = useState("");
  const [equipmentPreferences, setEquipmentPreferences] = useState([]);
  const [comment, setComment] = useState("");
  const [additionalContact, setAdditionalContact] = useState(null);
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);

  const handleStartDateChange = (value) => {};

  const handleEndDateChange = (value) => {};

  const handleSubscribeChange = (e) => {
    setSubscribe(e.target.checked);
  };

  const handlePreferenceChange = (preference) => {
    setSelectedPreference(preference);

    if (preference === "recoger") {
      setAddress("");
      setIsAddressValid(true);
    }
  };

  const handleFrequencyOptionClick = (selectedFrequency) => {
    setFrequency(selectedFrequency);
  };

  const handleAddressChange = (event) => {
    const addressValue = event.target.value;
    setAddress(addressValue);
    setIsAddressValid(addressValue.trim() !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2 && selectedPreference === "entrega" && !isAddressValid) {
      return;
    }
    if (step !== 3) {
      changeStep("NEXT");
    } else {
      reserve();
    }
  };

  const reserve = async () => {
    const datos = {
      userId: user.iduser,
      productId: product.id,
      starDate: startDate,
      endDate: endDate,
      comment: comment,
      // subscribe: subscribe,
      // preference: selectedPreference,
      // equipmentPreferences: equipmentPreferences,
      // additionalContact: additionalContact,
    };

    const res = await RentsService.create(datos);
    console.log(res);

    if (res.status === 201)
      Swal.fire(
        "¡Muchas gracias!",
        "La reserva se ha efectuado con éxito. Recibirá un mail con los datos",
        "success"
      );
  };

  const back = () => {
    changeStep("PREV");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEquipmentPreferenceToggle = (equipment) => {
    const updatedPreferences = equipmentPreferences.includes(equipment)
      ? equipmentPreferences.filter((item) => item !== equipment)
      : [...equipmentPreferences, equipment];
    setEquipmentPreferences(updatedPreferences);
  };

  const handleAdditionalContactChange = (contact) => {
    setAdditionalContact(contact);
  };

  useEffect(() => {
    setIsAddressValid(
      selectedPreference === "recoger" || address.trim() !== ""
    );
  }, [selectedPreference, address]);

  const formatDate = (date) => {
    return moment(date).locale("es").format("DD/MMMM/YYYY");
  };

  return (
    <>
      {/* <div className={styles.containerTitle}>
        <h1 className={styles.title}>Datos de su reserva</h1>
      </div> */}

      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {step === 1 && (
              <ContactReservation
                user={user}
                subscribe={subscribe}
                handleSubscribeChange={handleSubscribeChange}
                onAdditionalContactChange={handleAdditionalContactChange}
                additionalContact={additionalContact}
              />
            )}
            {step === 2 && (
              <ReservationDetails
                product={product}
                startDate={formatDate(startDate)}
                endDate={formatDate(endDate)}
                selectedPreference={selectedPreference}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                handlePreferenceChange={handlePreferenceChange}
                frequency={frequency}
                handleFrequencyOptionClick={handleFrequencyOptionClick}
                equipmentPreferences={equipmentPreferences}
                handleEquipmentPreferenceToggle={
                  handleEquipmentPreferenceToggle
                }
                comment={comment}
                handleCommentChange={handleCommentChange}
                address={address}
                handleAddressChange={handleAddressChange}
              />
            )}
            {step === 3 && (
              <ConfirmReservation
                user={user}
                subscribe={subscribe}
                selectedPreference={selectedPreference}
                frequency={frequency}
                product={product}
                equipmentPreferences={equipmentPreferences}
                comment={comment}
                additionalContact={additionalContact}
                startDate={formatDate(startDate)}
                endDate={formatDate(endDate)}
                address={address}
              />
            )}
            <div className={styles.buttonsContainer}>
              {step !== 1 && (
                <button
                  type="button"
                  onClick={back}
                  className={styles.backButton}
                >
                  Volver
                </button>
              )}
              <div className={styles.submitButtonContainer}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={
                    (step === 2 &&
                      selectedPreference === "entrega" &&
                      !isAddressValid) ||
                    (step === 1 &&
                      selectedPreference === "entrega" &&
                      address.trim() === "")
                  }
                >
                  {step !== 3 ? "Siguiente" : "Confirmar"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.productDetailsContainer}>
          <ReservationProductDetails product={product} />
        </div>
      </div>
    </>
  );
};

export default Reservation;
