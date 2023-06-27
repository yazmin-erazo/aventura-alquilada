import React from 'react';
import styles from './CancellationPolicyModal.module.css';

const CancellationPolicyModal = ({ show, handleClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h1>¡Conocer Nuestra Política de Cancelación es Importante!</h1>
                <p>En <strong>Digital Booking</strong>, valoramos tu tiempo y tu dinero. Por ello, queremos que estés informado sobre nuestra política de cancelaciones:</p>

                <ul>
                    <li>Para un reembolso completo, debes cancelar con al menos 48 horas de anticipación a la fecha de entrega o recogida del equipamiento deportivo.</li>
                    <li>Las cancelaciones realizadas con menos de 48 horas de anticipación incurrirán en una tarifa del 50% del total del alquiler.</li>
                    <li>No se ofrecen reembolsos después del envío o entrega del equipamiento deportivo.</li>
                </ul>

                <h2>¿Por qué tenemos esta política?</h2>
                <p>Esta política nos permite gestionar eficientemente nuestro inventario y garantizar la disponibilidad de nuestro equipamiento deportivo a todos nuestros clientes. También, nos permite proteger a nuestros socios de alquiler.</p>

                <h2>¿Qué sucede en caso de condiciones climáticas adversas?</h2>
                <p>Entendemos que las condiciones climáticas pueden cambiar y pueden afectar tus planes. Si las condiciones climáticas impiden el uso seguro del equipo, te ofrecemos la opción de cambiar la fecha de tu reserva sin coste adicional. Si no puedes cambiar la fecha, te ofreceremos un reembolso completo.</p>

                <h2>¡Estamos aquí para ayudarte!</h2>
                <p>Si tienes alguna pregunta o inquietud sobre nuestra política de cancelación, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte a tener una gran experiencia alquilando el equipamiento deportivo que necesitas.</p>

                <button onClick={handleClose}>Entendido</button>
            </div>
        </div>
    );
}

export default CancellationPolicyModal;