import React from 'react';
import styles from './TermsAndConditions.module.css';

const TermsAndConditionsModal = ({show, handleClose}) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Experimenta la Aventura con Seguridad y Confianza</h2>
        <p><strong>1. ¡Bienvenido a Digital Booking!</strong> Somos más que una simple empresa de alquiler. Nuestra misión es proporcionar equipos deportivos de la más alta calidad para garantizar la mejor experiencia deportiva posible.</p>
        <p><strong>2. Nuestros Términos:</strong> Al utilizar nuestros servicios, te comprometes a adherirte a los términos y condiciones presentados aquí. Esto nos permite mantener nuestros estándares y asegurarte una experiencia positiva.</p>
        <p><strong>3. Servicios que Ofrecemos:</strong> Nos enorgullece ofrecer alquileres de equipos deportivos de alta calidad para una variedad de actividades, incluyendo surf, camping, escalada y más. Nos apasiona ayudarte a realizar la aventura de tus sueños.</p>
        <p><strong>4. Tu Privacidad es Nuestra Prioridad:</strong> Nos tomamos muy en serio la protección de tus datos. Tu privacidad es importante para nosotros, por lo que siempre manejamos tus datos con el máximo cuidado y respeto.</p>
        <p><strong>5. Política de Pago:</strong> Para tu comodidad, ofrecemos múltiples opciones de pago y todos los pagos son seguros. Por favor, realiza tus pagos a tiempo para garantizar la disponibilidad de tu equipo.</p>
        <p><strong>6. Cancelaciones y Reembolsos:</strong> Entendemos que los planes pueden cambiar. Consulta nuestras políticas de cancelación y reembolso antes de hacer una reserva para estar seguro de que te conviene.</p>
        <p>Para obtener información más detallada, te invitamos a leer los términos y condiciones completos en nuestro sitio web. Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros:</p>
        <p><strong>Dirección postal:</strong> 123 High Street, London, SW1A 1AA, Reino Unido.</p>
        <p><strong>Correo electrónico:</strong> digitalhouse.dh123@gmail.com</p>
        <button onClick={handleClose}>Entendido</button>
      </div>
    </div>
  );
}

export default TermsAndConditionsModal;
