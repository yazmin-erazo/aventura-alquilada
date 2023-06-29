import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import styles from "./ActionButtons.module.css";

const ActionButtons = ({ onDelete, onEdit, isDisabled  }) => {
  const disabled = isDisabled === undefined ? false : !isDisabled;

  return (
    <div className={styles["action-buttons"]}>
      <button
        className={`${styles["action-button"]} ${styles["action-button-delete"]} ${disabled ? styles["disabled"] : ""}`}
        onClick={onDelete}
        disabled={disabled}
      >
        <FaRegTrashAlt />
      </button>
      <button
        className={`${styles["action-button"]} ${styles["action-button-edit"]} ${disabled ? styles["disabled"] : ""}`}
        onClick={onEdit}
        disabled={disabled}
      >
        <FiEdit />
      </button>
    </div>
  );
};

export default ActionButtons;
