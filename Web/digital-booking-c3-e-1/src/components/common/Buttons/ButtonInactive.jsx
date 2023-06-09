import styles from "./ButtonPrimary.module.css";
import { useNavigate } from "react-router-dom";

const ButtonInactive = ({ onClick, to, children }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(to);
  };

  return (
    <button className={styles.buttonInactive} onClick={onClick || handleCancel}>
      {children}
    </button>
  );
};

export default ButtonInactive;