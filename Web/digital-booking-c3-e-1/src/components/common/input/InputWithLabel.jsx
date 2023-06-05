import React from 'react';
import styles from './input.module.css';

const InputWithLabel = ({ children, type, value, onChange, isEditable }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{children}
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder="Ingresa el valor"
        disabled={isEditable === undefined ? false: !isEditable}
      />
      </label>
    </div>
  );
};

export default InputWithLabel;