import ActionButtons from "../Buttons/ActionButtons";
import styles from "./TableCategoryRow.module.css";

const TableCategoryRow = ({ category, onDelete, onEdit }) => {
  return (
    <tr className={styles["table-row"]}>
      <td>{category.id}</td>
      {(category.imageURL || category.imageURL === "") && (
        <td>
          <img
            src={category.imageURL}
            alt={category.name}
            className={styles["category-image"]}
          />
        </td>
      )}
      <td>{category.name}</td>
      <td className={styles["description-cell"]}>
        <div className={styles["container-text-description"]}>
          {category.description}
        </div>
      </td>

      <td className={styles["actions"]}>
        <ActionButtons onDelete={onDelete} onEdit={onEdit} />
      </td>
    </tr>
  );
};

export default TableCategoryRow;
