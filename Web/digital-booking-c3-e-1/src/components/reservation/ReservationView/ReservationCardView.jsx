import { format, addDays  } from "date-fns";
import { es } from "date-fns/locale";
import styles from "./ReservationCardView.module.css";
import { differenceInDays } from "date-fns";
import moment from "moment";


const ReservationCard = ({ reservation }) => {

  const { user, starDate, endDate, delivery, product, comment } = reservation;
  const formattedStartDate = starDate ? format(addDays(new Date(starDate), 1 ), "dd 'de' MMMM 'de' yyyy", { locale: es }) : null;
  const formattedEndDate = endDate ? format(addDays(new Date(endDate), 1), "dd 'de' MMMM 'de' yyyy", { locale: es }) : null;
  const productPrice = product && product.price ? product.price : 0;
  
  let totalDays = 0;
  let totalPrice = 0;
  
  if (formattedStartDate && formattedEndDate) {
    totalDays = differenceInDays(new Date(endDate), new Date(starDate)) + 1 ;
    totalPrice = totalDays * productPrice;
  }

  return product && (
    <div className={styles.reservationCard}>
      <div className={styles.reservationimage}>
        <img src={product.imageURL} alt="Imagen de la reserva" />
      </div>
      <div className={styles.reservationInfo}>
        <h3>{user.name} {user.lastname} esta es su reserva</h3>
        <p>Desde: {formattedStartDate}</p>
        <p>Hasta: {formattedEndDate}</p>
        <p>Entrega: {delivery === "recoger en tienda" ? "Recoger en tienda" : `Entregar en ${delivery}`}</p>
        <p>Comentarios: {comment ? comment : "No hay comentarios"}</p>
        <p>Precio total: $ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ReservationCard;