import React from 'react';
import styles from './input.module.css';

const InputWithLabel = ({ children, type, value, onChange, isEditable }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{children}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder="Ingresa el valor"
        disabled={isEditable === undefined ? false: !isEditable}
      />
    </div>
  );
};

export default InputWithLabel;