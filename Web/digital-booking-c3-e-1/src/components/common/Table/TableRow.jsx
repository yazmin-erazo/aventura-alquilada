import ActionButtons from "../Buttons/ActionButtons";
import styles from "./TableRow.module.css";

const TableRow = ({ product, onDelete, onEdit }) => {
  return (
    <tr className={styles["table-row"]}>
      <td>{product.id}</td>
      {
        (product.imageURL || product.imageURL === "") &&
        <td>
        <img
          src={product.imageURL}
          alt={product.name}
          className={styles["product-image"]}
          />
      </td>
        }
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.brand}</td>
      <td className={styles["description-cell"]}>
        <div className={styles["container-text-description"]}>
          {product.description}
        </div>
      </td>
      <td>{product.category}</td>
      <td>{product.state}</td>
      <td className={styles["actions"]}>
        <ActionButtons onDelete={onDelete} onEdit={onEdit} />
      </td>
    </tr>
  );
};

export default TableRow;
