import { FaRegTrashAlt} from 'react-icons/fa';
import { FiEdit} from 'react-icons/fi';
import styles from "./ActionButtons.module.css";

const ActionButtons = ({ onDelete, onEdit }) => {
  return (
    <div className={styles["action-buttons"]}>
      <button className={`${styles["action-button"]} ${styles["action-button-delete"]}`} onClick={onDelete}>
        <FaRegTrashAlt />
      </button>
      <button className={`${styles["action-button"]} ${styles["action-button-edit"]}`} onClick={onEdit}>
        <FiEdit />
      </button>
    </div>
  );
};

export default ActionButtons;