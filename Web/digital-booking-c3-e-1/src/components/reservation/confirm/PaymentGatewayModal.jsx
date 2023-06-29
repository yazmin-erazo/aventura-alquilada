import React, { useState, useEffect } from "react";
import styles from "./PaymentGatewayModal.module.css";
import PaymentSummaryModal from "./PaymentSummaryModal";
import { BsCreditCard } from "react-icons/bs";

const PaymentGatewayModal = ({
  show,
  handleClose,
  productPrice,
  totalDays,
  totalPrice,
  delivery,
  setIsPaymentCompleted,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("debitCard");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentData, setPaymentData] = useState({});
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handlePayment = (e) => {
    e.preventDefault();

    const newPaymentData = {
      paymentMethod,
      cardHolder,
      cardNumber,
      expiryDate,
      cvc,
    };

    const errors = validateFormFields(newPaymentData);
    if (Object.keys(errors).length === 0) {
      setPaymentData(newPaymentData);
      setShowSummaryModal(true);
    } else {
      setFormErrors(errors);
    }
  };

  const validateFormFields = (data) => {
    const errors = {};
    if (paymentMethod == "debitCard") {
      if (!data.cardHolder.trim()) {
        errors.cardHolder = "Ingrese el nombre del titular de la tarjeta";
      }

      if (!data.cardNumber.trim() || !/^\d{16}$/.test(data.cardNumber)) {
        errors.cardNumber = "Ingrese un número de tarjeta válido (16 dígitos)";
      }

      if (
        !data.expiryDate.trim() ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)
      ) {
        errors.expiryDate = "Ingrese una fecha de vencimiento válida (MM/YY)";
      }
    } else if (paymentMethod == "creditCard") {
      if (!data.cardHolder.trim()) {
        errors.cardHolder = "Ingrese el nombre del titular de la tarjeta";
      }

      if (!data.cardNumber.trim() || !/^\d{16}$/.test(data.cardNumber)) {
        errors.cardNumber = "Ingrese un número de tarjeta válido (16 dígitos)";
      }

      if (
        !data.expiryDate.trim() ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)
      ) {
        errors.expiryDate = "Ingrese una fecha de vencimiento válida (MM/YY)";
      }

      if (
        data.paymentMethod === "creditCard" &&
        (!data.cvc.trim() || !/^\d{3}$/.test(data.cvc))
      ) {
        errors.cvc = "Ingrese un código CVC válido (3 dígitos)";
      }
    }
    return errors;
  };

  useEffect(() => {
    setFormErrors({});
  }, [paymentMethod]);

  if (!show) {
    return null;
  }

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div>
            {" "}
            <h1 className={styles.modalHeader}>
              {" "}
              <BsCreditCard size={24} className={styles.modalHeaderIcon} />{" "}
              Pasarela de Pagos
            </h1>
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Precio del producto:</span>
              <span className={styles.detailValue}>$ {productPrice}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>
                Días totales de la reserva:
              </span>
              <span className={styles.detailValue}>{totalDays} días</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Precio total a pagar:</span>
              <span className={styles.detailValue}>$ {totalPrice}</span>
            </div>
          </div>

          <form onSubmit={handlePayment} className={styles.formPayment}>
            <div className={styles.methodPay}>
              <label>
                <input
                  type="radio"
                  value="debitCard"
                  checked={paymentMethod === "debitCard"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Tarjeta Débito
              </label>

              <label>
                <input
                  type="radio"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Tarjeta Crédito
              </label>

              {delivery === "recoger en tienda" && (
                <label>
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Efectivo en Tienda
                </label>
              )}
            </div>
            {(paymentMethod === "debitCard" ||
              paymentMethod === "creditCard") && (
              <>
                <input
                  type="text"
                  placeholder="Nombre del titular"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  required
                />
                {formErrors.cardHolder && (
                  <span className={styles.error}>{formErrors.cardHolder}</span>
                )}
                <input
                  type="text"
                  placeholder="Número de la tarjeta"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
                {formErrors.cardNumber && (
                  <span className={styles.error}>{formErrors.cardNumber}</span>
                )}
                <input
                  type="text"
                  placeholder="Fecha de vencimiento (MM/YY)"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
                {formErrors.expiryDate && (
                  <span className={styles.error}>{formErrors.expiryDate}</span>
                )}

                {paymentMethod === "creditCard" && (
                  <>
                    <input
                      type="text"
                      placeholder="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      required
                    />
                    {formErrors.cvc && (
                      <span className={styles.error}>{formErrors.cvc}</span>
                    )}
                  </>
                )}
              </>
            )}
          </form>
          <div className={styles.buttonsContainer}>
            <button
              data-testid="button-close"
              className={styles.buttonClose}
              type="button"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              data-testid="button-pay"
              className={styles.buttonPay}
              type="button"
              onClick={handlePayment}
            >
              Pagar
            </button>
          </div>
        </div>
      </div>

      <PaymentSummaryModal
        show={showSummaryModal}
        handleClose={() => {
          setShowSummaryModal(false);
          handleClose();
        }}
        paymentData={paymentData}
        setIsPaymentCompleted={setIsPaymentCompleted}
      />
    </>
  );
};

export default PaymentGatewayModal;
