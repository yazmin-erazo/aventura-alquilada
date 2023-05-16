import { BsTrash, BsPencil } from 'react-icons/bs';

const ActionButtons = ({ onDelete, onEdit }) => {
  return (
    <td>
      <button onClick={onDelete}>
        <BsTrash />
      </button>
      <button onClick={onEdit}>
        <BsPencil />
      </button>
    </td>
  );
};

export default ActionButtons;