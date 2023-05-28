import styles from "./Button.module.css";

const Button = ({ text }) => {
  return (
    <div className={styles.buttonContainer}>
      {" "}
      <div className={styles.button}>{text}</div>
    </div>
  );
};

export default Button;
