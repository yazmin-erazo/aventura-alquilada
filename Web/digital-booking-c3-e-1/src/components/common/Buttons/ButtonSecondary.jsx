import { BsArrowUpRight } from "react-icons/bs";
import styles from "./ButtonSecondary.module.css";

const ButtonSecondary = ({ children }) => {
  return (
    <div className={styles["button-container"]}>
      <div className={styles["primary-button"]}>
      { children }
      </div>
      <div
        className={styles["secondary-button"]}
      >
       <BsArrowUpRight className={styles.icon}/>
      </div>
    </div>
  );
};

export default ButtonSecondary;
