import { FaSearch } from "react-icons/fa";
import styles from "./SearchEngine.module.css";
import { useState } from "react";
import CalendarProducts from "../../resources/Calendar/CalendarProducts";
import Select from "../../common/select/Select";
import CityService from "../../../shared/services/CityService";
import Calendar from "../../resources/Calendar/Calendar";

const SearchEngine = ({handleSearch}) => {

  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [dates,setDates] =useState("")
  const [searchParams, setSearchParams] = useState({
    name: text,
    city: "",
    dates: null
  })
  const [cityOptions, setCityOptions] = useState([])
  const handleInputChange = e =>{
    setText(e.target.value);
  } 
  const handleSearchClick = e => {
    e.preventDefault();
    if(text != "" && text != null)
    {
      handleSearch({...searchParams, name: text, city: city, dates: dates});
    }
  }

  const fetchCities = async () => {
    const cities = await CityService.getAll();
    setCityOptions(cities);
  }

  return (
    <div className={styles["search-engine"]}>
      <form className={styles.form}>
        <Select options={cityOptions} placeholder={'Seleccione...'}></Select>
        <Calendar/>
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
