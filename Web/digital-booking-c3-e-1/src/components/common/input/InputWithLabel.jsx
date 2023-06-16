import React from 'react';
import styles from './input.module.css';

const InputWithLabel = ({ children, type, value, onChange, isEditable, placeholder, error }) => {
  const hasError = error && error.length > 0;

  return (
    <div className={`${styles.inputContainer} ${hasError ? styles.error : ''}`}>
      <label className={styles.label}>{children}
        <input
          className={`${styles.input} ${hasError ? styles.inputError : ''}`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={isEditable === undefined ? false : !isEditable}
        />
      </label>
      {hasError && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default InputWithLabel;