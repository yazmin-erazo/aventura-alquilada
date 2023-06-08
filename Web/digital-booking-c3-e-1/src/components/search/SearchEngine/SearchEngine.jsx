import { FaSearch } from "react-icons/fa";
import styles from "./SearchEngine.module.css";
import { useState } from "react";

const SearchEngine = ({handleSearch}) => {

  const [text, setText] = useState("");
  const handleInputChange = e => setText(e.target.value);
  const handleSearchClick = e => {
    e.preventDefault();
    handleSearch(text);
  }

  return (
    <div className={styles["search-engine"]}>
      <form className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputSearch}
          placeholder="Buscar por actividad, equipo..."
          onChange={handleInputChange}
        />
        <button className={styles["search-icon-button"]} type="submit" onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchEngine;
