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
import { useNavigate } from "react-router-dom";

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
  toggleCalendar,
  isCalendarOpen,
  handleSelectDates,
}) => {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [delivery, setDelivery] = useState("recoger en tienda");
  const [equipmentPreferences, setEquipmentPreferences] = useState([]);
  const [comment, setComment] = useState("");
  const [additionalContact, setAdditionalContact] = useState(null);
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [dis, setDis] = useState(false)
  const [isPaymentCompletedButton, setIsPaymentCompletedButton] = useState(false);
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const navigate = useNavigate();

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
    setDis(true)
    Swal.fire({
      title: "¡Un momento por favor!",
      text: "Estamos procesando tu reserva...",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const datos = {
      userId: user.iduser,
      productId: product.id,
      starDate: startDate,
      endDate: endDate,
      comment: comment,
      delivery: address,
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
        "¡Reserva Exitosa!",
        "Gracias por tu reserva. Pronto recibirás un correo electrónico con todos los detalles. ¡Esperamos que disfrutes tu experiencia!",
        "success"
      ).then(() => {
        navigate(`/`)
      });
  };

  const back = () => {
    changeStep("PREV");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEquipmentPreferenceToggle = (equipment) => {
    const updatedPreferences = equipmentPreferences.some((equi) => equi.name === equipment.name)
      ? equipmentPreferences.filter((item) => item.name !== equipment.name)
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
                handlePreferenceChange={handlePreferenceChange}
                handleFrequencyOptionClick={handleFrequencyOptionClick}
                equipmentPreferences={equipmentPreferences}
                handleEquipmentPreferenceToggle={handleEquipmentPreferenceToggle}
                comment={comment}
                handleCommentChange={handleCommentChange}
                address={address}
                handleAddressChange={handleAddressChange}
                toggleCalendar={toggleCalendar}
                isCalendarOpen={isCalendarOpen}
                handleSelectDates={handleSelectDates}
                insuranceSelected={insuranceSelected}
                setInsuranceSelected={setInsuranceSelected}
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
                setIsPaymentCompletedButton={setIsPaymentCompletedButton}
                insuranceSelected={insuranceSelected}
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
                  data-testid="submit-button"
                  disabled={
                    (step === 2 &&
                      delivery === "entrega" &&
                      !isAddressValid) ||
                    (step === 3 && (!isPrivacyAccepted || !isPaymentCompletedButton)) || dis
                  }
                >
                  {step !== 3 ? "Siguiente" : "Confirmar reserva"}
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
