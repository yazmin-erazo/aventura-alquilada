import { FaSearch } from "react-icons/fa";
import styles from "./SearchEngine.module.css";
import { useEffect, useState } from "react";
import CalendarProducts from "../../resources/Calendar/CalendarProducts";
import Select from "../../common/select/Select";
import CitiesService from "../../../shared/services/CitiesService";

const SearchEngine = ({handleSearch}) => {

  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [dates,setDates] =useState("")
  const [cityOptions, setCityOptions] = useState([])
  const handleInputChange = e =>{
    setText(e.target.value);
  } 
  const handleSearchClick = e => {
    e.preventDefault();
    if(text != "" && text != null)
    {
      handleSearch({ search: text });
    }
  }

  const fetchCities = async () => {
    const cities = await CitiesService.getAll();
    setCityOptions(cities);
  }

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
        <Select options={cityOptions} placeholder={'Seleccione...'}></Select>
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
