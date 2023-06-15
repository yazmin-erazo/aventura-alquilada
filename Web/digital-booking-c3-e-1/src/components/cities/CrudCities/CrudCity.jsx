import { useCallback, useEffect, useState, useContext } from "react";
import TableCityRow from "../../common/TableCity/TableCityRow";
import styles from "./CrudCity.module.css";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Pagination from "../../resources/pagination/Pagination";
import { Link } from "react-router-dom";
import { CitiesContext } from "../../../context/CitiesContext";
import CitiesService from "../../../shared/services/CitiesService";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrudCity = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const data = useContext(CitiesContext)
  const [currentCities, setCurrentCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ reload, setReload ] = useState(false)

  const pageLimit = 8;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesCurrent = await CitiesService.getAll()
        setCities(citiesCurrent)
      }
      catch {
        setCities(data.cities);
      }
    }
    fetchCities()
  }, [reload]);

  useEffect(() => {
    onPageChanged();
  }, [currentPage, cities]);

  const onPageChanged = () => {
    const offset = (currentPage - 1) * pageLimit;
    setCurrentCities(cities.slice(offset, offset + pageLimit));
  };

  // usecallback para memorizar y asegurarnos de que no se creara una nueva instancia en cada renderizado
  const handleDelete = (cityId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a6cf7e',
      cancelButtonColor: '#fd7053',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí, ¡Eliminar!'
    }).then( async(result) => {
      if (result.isConfirmed) {
        try {
          const res = await CitiesService.deleteByID(cityId)
          if (res.status === 200) {
            const updatedCities = cities.filter(
              (city) => city.id !== cityId
            );
            setCities(updatedCities);
            setReload(!reload)
            Swal.fire(
              '¡Eliminada!',
              'La ciudad ha sido eliminada.',
              'success'
            )
          }
        } catch (error) {
          Swal.fire(
            'Error',
            'Ha ocurrido un error al eliminar la ciudad.',
            'error'
          )
        }
      }
      else {
        Swal.close();
      }
    });
  }

  const handleEdit = useCallback((city) => {
    console.log("Editando ciudad:", city);
    console.log("Editando ciudad con ID:", city.id);

    navigate('edit', { replace: true, state: { city: city } });
  }, [navigate]);

  return (
    <>
      <section className={styles["container"]} >
        <div className={styles["button-container"]}>
          <Link to="city/add">
            <ButtonPrimary>Agregar ciudad</ButtonPrimary>
          </Link>
        </div>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Codigo</th>
              <th>Codigo de pais</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Nombre Genérico</th>
              <th className={styles["actions-th"]}>Acciones</th>
            </tr>
          </thead>
          <tbody>

            {currentCities.map((city) => (
              <TableCityRow
                key={city.id}
                city={city}
                onDelete={() => handleDelete(city.id)}
                onEdit={() => handleEdit(city)}
              />
            ))}
          </tbody>
        </table>
      </section>
        <Pagination
          onPageChanged={onPageChanged}
          limit={pageLimit}
          total={cities.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </>
  );
};

export default CrudCity;
