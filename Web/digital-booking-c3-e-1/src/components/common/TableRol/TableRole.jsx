import React from "react";
import styles from "../Table/TableRow.module.css";
import style from "./TableRole.module.css"
import ActionButtons from "../Buttons/ActionButtons";

const TableRole = ({ role, onDelete, onEdit }) => {
  const renderPermissions = () => {
    const permissions = [];

    for (const [key, value] of Object.entries(role)) {
      if (key !== "id" && key !== "name" && value === true) {
        const formattedKey = key.replace(/([A-Z])/g, " $1").trim();
        const permissionType = key.replace(/List$|Create$|Update$|Delete$/, "");
        const permissionClass = style[permissionType.toLowerCase()];
        const permission = (
          <span key={key} className={`${style.permission} ${permissionClass}`}>
            {formattedKey}
          </span>
        );
        permissions.push(permission);
      }
    }

    return permissions;
  };

  return (
    <tr className={styles["table-row"]}>
      <td>{role.id}</td>
      <td>{role.name}</td>
      <td>
        <div className={style.permissionsContainer}>{renderPermissions()}</div>
      </td>
      <td className={styles["actions"]}>
        <ActionButtons onDelete={onDelete} onEdit={onEdit} />
      </td>
    </tr>
  );
};

export default TableRole;
