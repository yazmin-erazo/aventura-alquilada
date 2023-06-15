import { useEffect, useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import Select from "../../common/select/Select";
import Swal from 'sweetalert2';
import styles from "./EditCity.module.css";
import CitiesService from "../../../shared/services/CitiesService";
import {useLocation, useNavigate} from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import ButtonInactive from "../../common/Buttons/ButtonInactive";

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
    cityCodeAPI: city.code,
    cityNameAPI: city.genericName,
    countryCodeAPI: city.countryCode,
  });

  const handleInputChange = (name, value) => {    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const {
      cityName,      
      latitude,
      longitude,
      cityCodeAPI,
      cityNameAPI,      
      countryCodeAPI,
    } = formData;

    const cityData = {      
      name: cityName,      
      latitude: latitude,
      longitude: longitude,
      code: cityCodeAPI,
      genericName: cityNameAPI,
      countryCode: countryCodeAPI,
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
        cityCodeAPI: "",
        cityNameAPI: "",
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
    <div className={styles.containerEditCity}>
      <header className={styles.header}>
        <h4 className={styles.addCityTitle}>
          <BiEdit size={20}/> Editar ciudad
        </h4>
      </header>

      <div className={styles.containerForm}>
        <div className={styles.editCityContainer}>
          <div className={styles.editCityForm}>
          <div className={styles.formColumn}>
          <InputWithLabel
              type="text"
              value={formData.cityName}
              onChange={(event) =>
                handleInputChange("cityName", event.target.value)
              }             
            >
              Nombre:
            </InputWithLabel>           

            <InputWithLabel
                type="number"
                value={formData.latitude}
                onChange={(event) =>
                  handleInputChange("latitude", event.target.value)
                }
                isEditable={false}
              >
                Latitud:
              </InputWithLabel>

              <InputWithLabel
                type="number"
                value={formData.longitude}
                onChange={(event) =>
                  handleInputChange("longitude", event.target.value)
                }
                isEditable={false}
              >
                Longitude:
              </InputWithLabel>
              
            </div>
            <div className={styles.formColumn}>
              <InputWithLabel
                  type="text"
                  value={formData.cityCodeAPI}
                  onChange={(event) =>
                    handleInputChange("cityCodeAPI", event.target.value)
                  }
                  isEditable={false}
                >
                  Código:
              </InputWithLabel>
              <InputWithLabel
                type="text"
                value={formData.countryCodeAPI}
                onChange={(event) =>
                  handleInputChange("countryCodeAPI", event.target.value)
                }
                isEditable={false}
              >
                Código Pais:
              </InputWithLabel>

              <InputWithLabel
              type="text"
              value={formData.cityNameAPI}
              onChange={(event) =>
                handleInputChange("cityNameAPI", event.target.value)
              }   
              isEditable={false}          
            >
              Nombre genérico:
            </InputWithLabel>            
          </div>
            
          </div>
          <div className={styles.editInfo}></div>
          <div className={styles.containerButton}>
            <div className={styles.buttonItem}>
              <ButtonInactive to="/admin/city/">Cancelar</ButtonInactive>
              <ButtonPrimary
                className={styles.submitBtn}
                onClick={handleSubmit}
              >
                Editar ciudad
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCity;
