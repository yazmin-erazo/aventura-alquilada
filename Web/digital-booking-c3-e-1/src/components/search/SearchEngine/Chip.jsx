import React from "react";
import styles from "./Chip.module.css";

const Chip = ({ label, selected, onClick }) => {
  const chipClass = selected ? `${styles.chip} ${styles.selected}` : styles.chip;

  return (
    <div className={chipClass} onClick={onClick}>
      {label}
    </div>
  );
};

export default Chip;