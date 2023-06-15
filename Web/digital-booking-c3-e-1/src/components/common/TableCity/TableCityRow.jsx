import ActionButtons from "../Buttons/ActionButtons";
import styles from "./TableCityRow.module.css";

const TableCityRow = ({ city, onDelete, onEdit }) => {
  return (
    <tr className={styles["table-row"]}>
      <td>{city.id}</td>      
      <td>{city.name}</td>
      <td>{city.code}</td>
      <td>{city.countryCode}</td>
      <td>{city.latitude}</td>
      <td>{city.longitude}</td>
      <td>{city.genericName}</td>
      <td className={styles["actions"]}>
        <ActionButtons onDelete={onDelete} onEdit={onEdit} />
      </td>
    </tr>
  );
};

export default TableCityRow;
