import React from "react";
import styles from "../Table/TableRow.module.css";
import style from "./TableUser.module.css";
import ActionButtons from "../Buttons/ActionButtons";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";

const TableUser = ({ user, onDelete, onEdit, isEditable }) => {


  const getInitials = (name) => {
    const names = name.split(" ");
    const firstNameInitial = user.name[0][0].toUpperCase();
    const lastNameInitial =
      names.length > 1 ? names[names.length - 1][0].toUpperCase() : "";

    return firstNameInitial + lastNameInitial;
  };

  // ---------------- Fin Conversion User Date ---------------
  const generatingDate = new Date(user.generatingDate);
  const formattedDate = `${generatingDate.getDate()}
  /${generatingDate.getMonth() + 1}
  /${generatingDate.getFullYear()} 
  ${generatingDate.getHours()}:${generatingDate.getMinutes()}:${generatingDate.getSeconds()}`;
  // ---------------- Fin Conversion User Date ---------------

  user.isActive = user.isActive ? "Activo" : "Inactivo";
  const statusIcon = user.isActive ? (
    <BsCheckCircleFill size={20} color="var(--primary-50)" />
  ) : (
    <RiCloseCircleFill size={20} color="#fd7053" />
  );

  return (
    <tr className={styles["table-row"]}>
      <td>{user.id}</td>
      <td>
        <div
          className={style["initials-circle"]}
          style={{ backgroundColor: user.initialsColor }}
        >
          {getInitials(user.firstName + " " + user.lastName)}
        </div>
      </td>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{statusIcon}</td>
      <td>{formattedDate}</td>
      <td>{user.role}</td>
      <td className={styles["actions"]}>
        <ActionButtons onDelete={onDelete} onEdit={onEdit} isDisabled={false}/>
      </td>
    </tr>
  );
};

export default TableUser;
