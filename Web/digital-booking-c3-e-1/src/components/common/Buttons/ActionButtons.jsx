import { BsTrash, BsPencil } from 'react-icons/bs';
import styles from './ActionButtons.module.css'

const ActionButtons = ({ onDelete, onEdit }) => {
  return (
    <div className={styles.button}>
      <button onClick={onDelete}>
        <BsTrash />
      </button>
      <button onClick={onEdit}>
        <BsPencil />
      </button>
    </div>
  );
};

export default ActionButtons;