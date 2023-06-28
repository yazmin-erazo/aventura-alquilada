import React, { useState, useEffect } from "react";
import styles from "./Reservation.module.css";
import RentsService from "../../shared/services/RentsService";
import ContactReservation from "./contact/ContactReservation";
import ConfirmReservation from "./confirm/ConfirmReservation";
import ReservationDetails from "./reservationDetails/ReservationDetails";
import moment from "moment";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import ReservationProductDetails from "./reservationDetails/ReservationProductDetails";
import Swal from "sweetalert2";
import PrivacyPolicyModal from "./confirm/PrivacyPolicies";

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
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [delivery, setDelivery] = useState("recoger en tienda");
  const [equipmentPreferences, setEquipmentPreferences] = useState([]);
  const [comment, setComment] = useState("");
  const [additionalContact, setAdditionalContact] = useState(null);
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  const handleStartDateChange = (value) => {};

  const handleEndDateChange = (value) => {};

  const handleSubscribeChange = (e) => {
    setIsSubscribe(e.target.checked);
  };

  const handlePreferenceChange = (preference) => {
    setDelivery(preference);

    if (preference === "recoger en tienda") {
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
    if (step === 2 && delivery === "entrega" && !isAddressValid) {
      return;
    }
    if (step === 1 || step === 2) {
      changeStep("NEXT");
    } else if (step === 3 && isPrivacyAccepted) {
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
      delivery: delivery,
      // deliveryAddress : address
      // subscribe: isSubscribe,
      // equipment: equipmentPreferences,
      // additionalContact: additionalContact,
      // policyPrivacy: isPrivacyAccepted
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

  const handlePrivacyAcceptanceChange = (e) => {
    setIsPrivacyAccepted(e.target.checked);
  };

  useEffect(() => {
    setIsAddressValid(
      delivery === "recoger en tienda" || address.trim() !== ""
    );
  }, [delivery, address]);

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
                isSubscribe={isSubscribe}
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
                delivery={delivery}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                handlePreferenceChange={handlePreferenceChange}
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
                isSubscribe={isSubscribe}
                delivery={delivery}
                product={product}
                equipmentPreferences={equipmentPreferences}
                comment={comment}
                additionalContact={additionalContact}
                startDate={formatDate(startDate)}
                endDate={formatDate(endDate)}
                address={address}
                isPrivacyAccepted={isPrivacyAccepted}
                handlePrivacyAcceptanceChange={handlePrivacyAcceptanceChange}
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
                      delivery === "entrega" &&
                      !isAddressValid) ||
                    (step === 3 && !isPrivacyAccepted)
                  }
                >
                  {step !== 3 ? "Siguiente" : "Reservar ahora"}
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
