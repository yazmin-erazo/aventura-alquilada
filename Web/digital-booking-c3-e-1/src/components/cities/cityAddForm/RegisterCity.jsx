import { useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./RegisterCity.module.css";
import CitiesService from "../../../shared/services/CitiesService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ButtonInactive from "../../common/Buttons/ButtonInactive";
import { BiPlusCircle } from "react-icons/bi";
import axios from "axios";

const RegisterCity = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [nameSelected, setName] = useState("");
  const [latitudeSelected, setLatitude] = useState("");
  const [longitudeSelected, setLongitude] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cityName: "",
    latitude: "",
    longitude: "",
    cityCodeAPI: "",
    cityNameAPI: "",
    countryCodeAPI: "",
  });

  const handleInputChange = (name, value) => {
    if (name === "cityName") {
      setName(value);
    }

    if (name === "latitude" || name === "longitude") {
      if (name === "latitude") {
        setLatitude(value);
      }

      if (name === "longitude") {
        setLongitude(value);
      }

      if (latitudeSelected !== "" && longitudeSelected !== "") {
        getReverseGeocode(latitudeSelected, longitudeSelected);
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function getReverseGeocode(latitude, longitude) {
    axios
      .get(
        `http://api.positionstack.com/v1/reverse?access_key=5802fbfcfcecda1c50e493bf66b80884&query=${latitude},${longitude}`
      )
      .then((response) => {
        console.log(response);
        let data = response.data.data;
        if (data !== "undefined") {
          if (data.length > 0) {
            console.log(data);
            if (data) {
              const cityInfo = data[0];
              const code = cityInfo.region_code;
              const countryCode = cityInfo.country_code;
              const county = cityInfo.county;
              const region = cityInfo.region;
              let genericName = "";
              if (county == null || region == null) {
                genericName = nameSelected;
              } else {
                genericName = cityInfo.county + ", " + cityInfo.region;
              }

              console.log(code);
              console.log(countryCode);
              console.log(genericName);
              handleInputChange("cityCodeAPI", code);
              handleInputChange("countryCodeAPI", countryCode);
              handleInputChange("cityNameAPI", genericName);
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener el geocódigo inverso:" + error);
      });
  }

  const fetchInfo = async () => {
    try {
      const data = await CitiesService.getAll();
      setCities(data);
    } catch (err) {
      console.log(`Error al cargar ciudades: ${err}`);
    }
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
        cityCodeAPI: "",
        cityNameAPI: "",
        countryCodeAPI: "",
      });
      setErrorMessage("");
      navigate(-1);
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
          "La ciudad ya existe o falta completar un campo.",
          "error"
        );
      }
    }
  };

  return (
    <div className={styles.containerNewCity}>
      <header className={styles.header}>
        <h4 className={styles.addCityTitle}>
          <BiPlusCircle size={20} />
          Agregar ciudad
        </h4>
      </header>

      <div className={styles.containerForm}>
        <div className={styles.registerCityContainer}>
          <div className={styles.registerCityForm}>
            <div className={styles.formColumn}>
              {/* <MapComponent></MapComponent> */}
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
            </div>
            <div className={styles.formColumn}>
              <InputWithLabel
                type="text"
                value={formData.cityCodeAPI}
                onChange={(event) =>
                  handleInputChange("cityCodeAPI", event.target.value)
                }
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
          <div className={styles.registerInfo}></div>
          <div className={styles.containerButton}>
            <div className={styles.buttonItem}>
              <ButtonInactive to="/admin/city/">Cancelar</ButtonInactive>
              <ButtonPrimary
                className={styles.submitBtn}
                onClick={handleSubmit}
              >
                Registrar ciudad{" "}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCity;
