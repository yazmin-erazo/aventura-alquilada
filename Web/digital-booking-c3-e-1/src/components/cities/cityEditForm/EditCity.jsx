import { useEffect, useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Select from "../../common/select/Select";
import Swal from 'sweetalert2';
import styles from "./EditCity.module.css";
import CitiesService from "../../../shared/services/CitiesService";
import {useLocation, useNavigate} from 'react-router-dom';

const EditCity = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state.city;
  console.log(city);
  const [errorMessage, setErrorMessage] = useState("");
  const cityId = city.id;

  const [formData, setFormData] = useState({
    cityName: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    cityNameAPI: city.nameAPI,
    countryNameAPI: city.countryAPI,
    countryCodeAPI: city.countryCodeAPI,
  });

  const handleInputChange = (name, value) => {    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const {
      selectedCategoryId
    } = formData;

    const cityData = {      
      idCategory: selectedCategoryId
    };
    console.log("Datos la ciudad:" + cityId, cityData);

    Swal.fire({
      title: 'Editando...',
      didOpen: () => { Swal.showLoading() }
    })
    try {
      const response = await CitiesService.updateByID(cityId, cityData);
      Swal.close();
      Swal.fire('Éxito', "Ciudad editada con éxito", 'success')
      console.log("Ciudad editada con éxito", cityId);
      console.log(response);

      // Reiniciar los campos del formulario después de enviar los datos
      setFormData({
        cityName: "",
        latitude: "",
        longitude: "",
        cityNameAPI: "",
        countryNameAPI: "",
        countryCodeAPI: "",
      });
      setErrorMessage(""); //Limpiar el mensaje de error
      //navigate(-1);
      
    } catch (error) {
      Swal.close();
      Swal.fire('Error', "Error al editar la ciudad", 'error' )
      console.error("Error al editar la ciudad:", error);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h2>Editar ciudad</h2>
      </header>

      <div className={styles.containerForm}>
        <div className={styles.editCityContainer}>
          <div className={styles.editCityForm}>
            <InputWithLabel
              type="text"
              value={formData.cityName}
              onChange={(event) =>
                handleInputChange("cityName", event.target.value)
              }
              isEditable={false}              
            >
              Nombre:
            </InputWithLabel>

            <InputWithLabel
                type="number"
                value={formData.latitude}
                onChange={(event) =>
                  handleInputChange("latitude", event.target.value)
                }
              >
                Latitud:
              </InputWithLabel>

              <InputWithLabel
                type="number"
                value={formData.longitude}
                onChange={(event) =>
                  handleInputChange("longitude", event.target.value)
                }
              >
                Longitude:
              </InputWithLabel>

              <InputWithLabel
                type="text"
                value={formData.countryNameAPI}
                onChange={(event) =>
                  handleInputChange("countryNameAPI", event.target.value)
                }
                isEditable={false}
              >
                Pais:
              </InputWithLabel>
            <ButtonPrimary className={styles.submitBtn} onClick={handleSubmit}>
              Editar ciudad
            </ButtonPrimary>
          </div>
          <div className={styles.editInfo}></div>
        </div>
      </div>
    </div>
  );
};

export default EditCity;
