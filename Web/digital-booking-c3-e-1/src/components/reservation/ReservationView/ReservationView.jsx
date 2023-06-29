import { useEffect, useState } from 'react';
import ReservationCardView from './ReservationCardView';
import RentsService from '../../../shared/services/RentsService';
import { useParams } from 'react-router-dom';
import styles from "./ReservationView.module.css";

const ReservationView = ({ match }) => {
    const [reservation, setReservation] = useState({user :{}});
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const rent = await RentsService.getById(id);
        console.log(rent);
        setReservation(rent);
    };

    if (!reservation) {
        return <div>Cargando...</div>;
    }

    return (
        <div className={styles.reservationContainer}>
            <ReservationCardView reservation={reservation} />
        </div>
    );
};

export default ReservationView;