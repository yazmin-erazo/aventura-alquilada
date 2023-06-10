import styles from "./ButtonPrimary.module.css";

const ButtonPrimary = ({ onClick, children, disabled }) => {
  return (
    <button className={`${styles.button} ${disabled ? styles.disabled : ''}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonPrimary;