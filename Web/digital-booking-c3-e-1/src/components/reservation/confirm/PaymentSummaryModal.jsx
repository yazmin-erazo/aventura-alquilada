import React from 'react';
import styles from './PaymentSummaryModal.module.css';

const PaymentSummaryModal = ({ show, handleClose, paymentData, setIsPaymentCompleted }) => {
    if (!show) {
        return null;
    }

    const handleButtonClose = () => {
        handleClose()
        setIsPaymentCompleted();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h1>Resumen del Pago</h1>

                <p>Método de Pago: {paymentData.paymentMethod === 'cash' ? 'Efectivo en Tienda' : paymentData.paymentMethod === 'debitCard' ? 'Tarjeta Débito' : 'Tarjeta Crédito'}</p>

                {(paymentData.paymentMethod === 'debitCard' || paymentData.paymentMethod === 'creditCard') && (
                    <>
                        <p>Nombre del Titular: {paymentData.cardHolder}</p>
                        <p>Número de la Tarjeta: {paymentData.cardNumber}</p>
                        <p>Fecha de Vencimiento: {paymentData.expiryDate}</p>
                    </>
                )}

                {paymentData.paymentMethod === 'cash' && (
                    <>
                        <p>Por favor, realice el pago en efectivo cuando recoja su pedido en la tienda.</p>
                        <p>En lo posible,segúrese de traer la cantidad exacta en efectivo, ya que la tienda puede no tener cambio.</p>
                        <p>Recuerde que su pedido no será entregado hasta que se confirme el pago en efectivo.</p>
                    </>
                )}

                <button onClick={handleButtonClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default PaymentSummaryModal;