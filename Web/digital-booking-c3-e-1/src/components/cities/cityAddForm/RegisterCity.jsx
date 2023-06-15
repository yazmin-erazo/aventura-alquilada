import { useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./RegisterCity.module.css";
import CitiesService from "../../../shared/services/CitiesService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterCity = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cityName: "",
    latitude: "",
    longitude: "",
    cityNameAPI: "",
    cityCodeAPI: "",
    countryNameAPI: "",
    countryCodeAPI: "",
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
      cityNameAPI,
      cityCodeAPI,
      countryNameAPI,
      countryCodeAPI,
    } = formData;

    const cityData = {
      name: cityName,
      latitude: latitude,
      longitude: longitude,
      nameAPI: cityNameAPI,
      codeAPI: cityCodeAPI,
      countryAPI: countryNameAPI,
      countryCodeAPI: countryCodeAPI,
    };

    try {
      await CitiesService.create(cityData);

      // Mostrar un mensaje de éxito al usuario con sweetalert2

      Swal.fire(
        "¡Registrada!",
        "La ciudad ha sido registrada exitosamente.",
        "success"
      );

      setFormData({
        cityName: "",
        latitude: "",
        longitude: "",
        cityNameAPI: "",
        cityCodeAPI: "",
        countryNameAPI: "",
        countryCodeAPI: "",
      });
      setErrorMessage("");
      navigate("admin");
    } catch (error) {
      // En caso de error al registrar la ciudad
      Swal.fire(
        "Error",
        "Ha ocurrido un error al registrar la ciudad.",
        "error"
      );

      if (
        error.response &&
        error.response.data.nombreExcepcion === "ExceptionInvalidValue"
      ) {
        Swal.fire(
          "Error",
          "El nombre de la ciudad ya existe, por favor ingrese otro valor",
          "error"
        );
      } else {
        Swal.fire(
          "Error",
          "Ha ocurrido un error al registrar la ciudad.",
          "error"
        );
      }
    }
  };

  return (
    <div className={styles.containerNewCity}>
      <header className={styles.header}>
        <h4 className={styles.addCityTitle}>Agregar ciudad</h4>
      </header>

      <div className={styles.containerForm}>
        <div className={styles.registerCityContainer}>
          <div className={styles.registerCityForm}>
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
            </div>
            <div className={styles.formColumn}>
              <div className={styles.containerButton}>
                <ButtonPrimary
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                >
                  Registrar ciudad
                </ButtonPrimary>
              </div>
            </div>
          </div>
          <div className={styles.registerInfo}></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCity;
