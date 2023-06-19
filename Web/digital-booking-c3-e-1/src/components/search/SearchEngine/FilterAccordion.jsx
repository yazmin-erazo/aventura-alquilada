import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import styles from "./FilterAccordion.module.css";
import FilterSidebar from "./FilterSidebar";

const FilterAccordion = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleAccordion = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  useEffect(() => {
    setIsExpanded(false);
  }, [onFilterChange]);

  return (
    <div className={styles.filterAccordion}>
      <div
        className={`${styles.accordionHeader} ${
          isExpanded ? styles.active : ""
        }`}
        onClick={handleToggleAccordion}
      >
        {isExpanded ? (
          <>
            <FaMinus className={styles.icon} />
            <span>Cerrar Filtros Avanzados</span>
          </>
        ) : (
          <>
            <FaPlus className={styles.icon} />
            <span>Abrir Filtros Avanzados</span>
          </>
        )}
      </div>
      {isExpanded && (
        <div className={styles.accordionContent}>
          <FilterSidebar onFilterChange={onFilterChange} />
        </div>
      )}
    </div>
  );
};

export default FilterAccordion;