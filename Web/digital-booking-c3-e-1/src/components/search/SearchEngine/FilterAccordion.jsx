import React, { useState, useEffect } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
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
    <div
      className={`${styles.ContainerAccordion} ${
        isExpanded ? styles.active : ""
      }`}
    >
      <div className={styles.filterAccordion}>
        <div
          className={`${styles.accordionHeader} ${
            isExpanded ? styles.active : ""
          }`}
          onClick={handleToggleAccordion}
        >
          {isExpanded ? (
            <>
              <div className={styles.title}>
                <FaMinusCircle className={styles.icon} />
                <span>Cerrar Filtros Avanzados</span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.title}>
                <FaPlusCircle className={styles.icon} />
                <span>Abrir Filtros Avanzados</span>
              </div>
            </>
          )}
        </div>
        {isExpanded && (
          <div className={styles.accordionContent}>
            <FilterSidebar onFilterChange={onFilterChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterAccordion;
