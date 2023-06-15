import { FaSearch } from "react-icons/fa";
import styles from "./SearchEngine.module.css";
import { useEffect, useState } from "react";
import CalendarProducts from "../../resources/Calendar/CalendarProducts";
import Select from "../../common/select/Select";
import CitiesService from "../../../shared/services/CitiesService";

const SearchEngine = ({handleSearch}) => {

  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [calendarShow, setCalendarShow] = useState(false)

  const handleInputChange = e =>{
    setText(e.target.value);
  } 
  const handleSearchClick = e => {
    e.preventDefault();
    if(text != null)
    {
      handleSearch({ search: text, cityId: city, startDate: selectedStartDate, endDate: selectedEndDate });
    }
  }

  const handleSelectDates = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const cityHandler = (value) => {
    setCity(value);
  }

  const handleButtonCalendar = () => {
    setCalendarShow(!calendarShow)
  }

  const fetchCities = async () => {
    const cities = await CitiesService.getAll();
    setCityOptions(cities);
  }

  console.log(city, selectedStartDate, selectedEndDate);

  useEffect( () => {
    try{
      fetchCities();
    } catch {
      err => console.log(err);
    }
  }, [])

  return (
    <div className={styles["search-engine"]}>
      <form className={styles.form}>
        <Select options={cityOptions} placeholder={'Seleccione...'} onChange={cityHandler}></Select>
        <div className={`${styles["button-calendar"]} ${!calendarShow ? styles.show : styles.hide}`} onClick={handleButtonCalendar} >Seleccione fechas</div>
        <div className={calendarShow ? styles.show : styles.hide} >
          <CalendarProducts onSelectDates={handleSelectDates} />
        </div>
        <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputSearch}
          placeholder="Buscar por actividad, equipo..."
          onChange={handleInputChange}
          />
        <button className={styles["search-icon-button"]} type="submit" onClick={handleSearchClick}>
          <FaSearch />
        </button>
        </div>
      </form>
    </div>
  );
};

export default SearchEngine;