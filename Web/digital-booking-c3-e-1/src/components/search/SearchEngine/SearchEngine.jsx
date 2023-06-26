import { FaSearch, FaCalendar } from "react-icons/fa";
import styles from "./SearchEngine.module.css";
import { useEffect, useState, useRef } from "react";
import CalendarProducts from "../../resources/Calendar/CalendarProducts";
import Select from "../../common/select/Select";
import CitiesService from "../../../shared/services/CitiesService";
import moment from "moment";
import "moment/locale/es";

const SearchEngine = ({ handleSearch }) => {
  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [calendarShow, setCalendarShow] = useState(false);
  const calendarRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setCalendarShow(false);
    handleSearch({
      search: text,
      cityId: city,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
    if(selectedStartDate)
      sessionStorage.setItem("dates", JSON.stringify({startDate: selectedStartDate, endDate: selectedEndDate}))
  };

  const handleSelectDates = (startDate, endDate) => {
    if (startDate && endDate) {
      if (startDate.isBefore(endDate)) {
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
      } else {
        setSelectedStartDate(endDate);
        setSelectedEndDate(startDate);
      }
    }
  };

  const cityHandler = (value) => {
    console.log(value);
    if (value !== "Seleccione...") setCity(value);
    else setCity("");
  };

  const handleButtonCalendar = () => {
    setCalendarShow(!calendarShow);
  };

  const handleDocumentClick = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setCalendarShow(false);
    }
  };

  const fetchCities = async () => {
    try {
      const cities = await CitiesService.getAll();

      cities.sort((a, b) => a.name.localeCompare(b.name));

      setCityOptions(cities);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCities();
    sessionStorage.removeItem("dates");
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <div className={styles["search-engine"]}>
      <form className={styles.form}>
        <Select
          options={cityOptions}
          placeholder={"Seleccione..."}
          onChange={cityHandler}
        ></Select>

        <div className={styles.containerButtonCalendar}>
          <div
            className={`${styles["button-calendar"]} ${
              calendarShow ? styles.active : ""
            }`}
            onClick={handleButtonCalendar}
          >
            <FaCalendar className={styles.calendarIcon} />
            <span
              className={
                selectedStartDate && selectedEndDate ? styles.selectedDates : ""
              }
            >
              {selectedStartDate && selectedEndDate
                ? `${formatDate(selectedStartDate)} - ${formatDate(
                    selectedEndDate
                  )}`
                : "Seleccione fechas"}
            </span>
          </div>
          {calendarShow && (
            <div ref={calendarRef} className={styles.calendarWrapper}>
              <CalendarProducts onSelectDates={handleSelectDates} />
            </div>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.inputSearch}
            placeholder="Buscar por actividad, equipo..."
            onChange={handleInputChange}
          />
          <button
            className={styles["search-icon-button"]}
            type="submit"
            onClick={handleSearchClick}
          >
            <FaSearch />
          </button>
        </div>
        <button
          className={styles.filterButton}
          type="button"
          onClick={handleSearchClick}
        >
          Filtrar
        </button>
      </form>
    </div>
  );
};

export default SearchEngine;
