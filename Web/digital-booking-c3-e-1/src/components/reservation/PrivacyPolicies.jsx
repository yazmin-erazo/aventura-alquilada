import React from 'react';
import styles from './PrivacyPolicies.module.css';

const PrivacyPolicyModal = ({ show, handleClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h1>¡Aquí Estamos Para Cuidar de Tu Privacidad!</h1>
                <p>En <strong>Digital Booking</strong>, tu seguridad es nuestra prioridad. Nosotros, los titulares del sitio web <a
                    href="http://equipamiento-deportivo-static.s3-website.us-east-2.amazonaws.com/">http://equipamiento-deportivo-static.s3-website.us-east-2.amazonaws.com/</a>
                    (en adelante, "el sitio web"), estamos comprometidos con la protección y la confidencialidad de cualquier información personal que nos proporcionas. Cumplimos con la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de
                    Datos de Carácter Personal y con el Reglamento (UE) 2016/679 del Parlamento y del Consejo.</p>

                <h2>¿Quién maneja tus datos?</h2>
                <ul>
                    <li>Identidad: <strong><span className="color-blue">DIGITAL</span> <span className="color-green">BOOKING</span></strong></li>
                    <li>Dirección postal: 123 High Street, London, SW1A 1AA, Reino Unido.</li>
                    <li>Correo electrónico: digitalhouse.dh123@gmail.com</li>
                </ul>

                <h2>¿Por qué y durante cuánto tiempo guardamos tus datos?</h2>
                <p>Cuando nos contactas para preguntas, solicitudes de presupuestos, propuestas o cualquier otra consulta, guardamos tus datos para poder atender tus peticiones de la mejor manera posible. Guardamos tus datos mientras dure el proceso de gestión de estas consultas.</p>

                <p>Si te suscribes a nuestro blog para recibir las últimas entradas, también guardamos tus datos. Seguiremos guardándolos mientras te encuentres suscrito, a menos que decidas cancelar tu suscripción.</p>

                <p>Cuando visitas nuestro sitio web, recopilamos y procesamos tus datos de manera automática para ofrecerte una mejor experiencia de usuario y para mejorar nuestros servicios. (Puedes leer nuestra política de cookies más abajo)</p>

                <p>Además, si nos das permiso, podemos enviarte correos electrónicos con noticias, novedades y promociones de los productos y servicios de nuestro sitio web. Conservaremos tus datos mientras te encuentres suscrito a estos servicios, a menos que decidas cancelar tu suscripción.</p>

                <p>Para la relación comercial con los clientes, conservaremos los datos durante el tiempo que sea necesario para la gestión de la relación comercial. Los contratos y las facturas se conservarán durante cinco y diez años, respectivamente.</p>

                <h2>¿Cuál es la base legal para el tratamiento de tus datos?</h2>
                <p>La base legal para el tratamiento de tus datos personales es tu consentimiento. Este consentimiento es expreso, libre, específico, informado e inequívoco.</p>

                <h2>¿Con quién compartimos tus datos?</h2>
                <p>En Digital Booking, nos comprometemos a no compartir ni ceder tus datos personales a terceros sin tu consentimiento expreso.</p>

                <p>También te informamos que no somos responsables si nos proporcionas datos personales de terceros sin su consentimiento. En ese caso, es responsabilidad tuya obtener el consentimiento de estas personas y hacerles saber nuestra política de privacidad.</p>

                <h2>¡Tienes control sobre tus datos!</h2>
                <p>Si eres mayor de 14 años, tienes el derecho de acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales en cualquier momento. Además, puedes revocar tu consentimiento para cualquier propósito que hayas dado anteriormente, enviándonos una carta a nuestra dirección postal con tu información de contacto y una fotocopia de tu DNI/NIF o cualquier otro documento que acredite tu identidad.</p>

                <h2>Al rellenar nuestro formulario, también aceptas:</h2>
                <p>Digital Booking puede contratar a terceros para proporcionar diversos servicios, incluyendo, pero no limitado a la gestión de cuestiones legales y la protección de datos. En todos estos casos, nos aseguramos de que estas partes firmen un acuerdo de confidencialidad para proteger tu información personal.</p>

                <p>Autorizas a que tus datos personales sean compartidos con las autoridades administrativas competentes o con el poder judicial si así lo requieren.</p>
                <button onClick={handleClose}>Entendido</button>
            </div>
        </div>
    );
}

export default PrivacyPolicyModal;