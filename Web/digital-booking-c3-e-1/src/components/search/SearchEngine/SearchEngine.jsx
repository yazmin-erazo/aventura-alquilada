import { FaSearch } from "react-icons/fa";
import styles from "./SearchEngine.module.css";

const SearchEngine = (props) => {
  return (
    <div className={styles["search-engine"]}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Buscar por actividad, equipo..."
        />
        <button className={styles["search-icon-button"]} type="button">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchEngine;
