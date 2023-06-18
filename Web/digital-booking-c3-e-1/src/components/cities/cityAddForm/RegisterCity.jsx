import { useState, useEffect } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import ButtonPrimary from "../../common/Buttons/ButtonPrimary";
import styles from "./RegisterCity.module.css";
import CitiesService from "../../../shared/services/CitiesService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ButtonInactive from "../../common/Buttons/ButtonInactive";
import { BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch } from "react-icons/fa";


const LocationMarker = ({ setPosition, fetchCityInfo }) => {
  const map = useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition([lat, lng]);
      fetchCityInfo(lat, lng);
    },
  });

  return null;
};

const UpdateMapCenter = ({ latitude, longitude }) => {
  const map = useMap();
  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 12);
    }
  }, [latitude, longitude, map]);

  return null;
};

const RegisterCity = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [nameSelected, setName] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(4.0826822565);
  const [longitude, setLongitude] = useState(-76.1975001138);
  const [formData, setFormData] = useState({
    cityName: "",
    cityCodeAPI: "",
    countryCode: "",
  });

  const handleInputCitySearch = (value) => {
    setCitySearch(value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${citySearch}&format=json`
      );

      if (response.data && response.data.length > 0) {
        const location = response.data[0];
        console.log(location)
        setLatitude(parseFloat(location.lat));
        setLongitude(parseFloat(location.lon));
      } else {
        alert('No results found');
      }
    } catch (error) {
      console.error('Failed to fetch city data:', error);
    }
  };

  const handleInputChange = (name, value) => {
    if (name === "cityName") {
      setName(value);
    }

    if (name === "cityCodeAPI") {
      setCityCode(value);
    }

    if (name === "countryCode") {
      setCountryCode(value);
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

  async function fetchCityInfo(latitude, longitude) {
    axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      .then(response => {
        console.log(response.data);
        let cityNameFromOpenstreetmap = response.data.address.county
        if (response.data.address.city) {
          cityNameFromOpenstreetmap = response.data.address.city
        } else if (response.data.address.town) {
          cityNameFromOpenstreetmap = response.data.address.town
        }
        const cityCodeFromOpenstreetmap = response.data.address['ISO3166-2-lvl4']
        const countryCodeFromOpenstreetmap = response.data.address.country_code
        const countryFromOpenstreetmap = response.data.address.country

        if (cityNameFromOpenstreetmap && cityCodeFromOpenstreetmap && countryCodeFromOpenstreetmap && countryFromOpenstreetmap) {
          setName(cityNameFromOpenstreetmap)
          setCityCode(cityCodeFromOpenstreetmap.toUpperCase())
          setCountryCode(countryCodeFromOpenstreetmap.toUpperCase())
          setCountry(countryFromOpenstreetmap)
        } else {
          throw new Error('Información incompleta');
        }
      })
      .catch(error => console.error('Error:', error));
  }

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

    const cityData = {
      name: nameSelected,
      code: cityCode,
      latitude: position[0],
      longitude: position[1],
      countryCode: countryCode,
      genericName: country
    };

    try {
      await CitiesService.create(cityData);

      Swal.fire(
        "¡Registrada!",
        "La ciudad ha sido registrada exitosamente",
        "success"
      );

      setFormData({
        cityName: "",
        cityCodeAPI: "",
      });
      setErrorMessage("");
      navigate(-1);
    } catch (error) {
      Swal.fire(
        "Error",
        "Ha ocurrido un error al registrar la ciudad",
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
          "La ciudad ya existe o falta completar un campo",
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

              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  className={styles.inputSearch}
                  placeholder="Buscar ciudad"
                  onChange={(event) =>
                    handleInputCitySearch(event.target.value)
                  }
                />
                <button
                  className={styles["search-icon-button"]}
                  type="submit"
                  onClick={handleSearch}
                >
                  <FaSearch />
                </button>
              </div>

              <MapContainer center={[latitude, longitude]} zoom={12} style={{ height: '300px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker setPosition={setPosition} fetchCityInfo={fetchCityInfo} />
                {position && <Marker position={position} draggable={true} />}
                <UpdateMapCenter latitude={latitude} longitude={longitude} />
              </MapContainer>

              <InputWithLabel
                type="text"
                value={nameSelected}
                onChange={(event) =>
                  handleInputChange("cityName", event.target.value)
                }
              >
                Nombre:
              </InputWithLabel>

              <InputWithLabel
                type="text"
                value={cityCode}
                onChange={(event) =>
                  handleInputChange("cityCodeAPI", event.target.value)
                }
              >
                Código:
              </InputWithLabel>


              <InputWithLabel
                type="text"
                value={countryCode}
                onChange={(event) =>
                  handleInputChange("countryCode", event.target.value)
                }
              >
                Código del País:
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
                Registrar ciudad
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCity;