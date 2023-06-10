import React from "react";
import styles from "../Table/TableRow.module.css";
import style from "./TableUser.module.css";
import ActionButtons from "../Buttons/ActionButtons";

const TableUser = ({ user, onDelete, onEdit }) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    const firstNameInitial = user.name[0][0].toUpperCase();
    const lastNameInitial =
      names.length > 1 ? names[names.length - 1][0].toUpperCase() : "";

    return firstNameInitial + lastNameInitial;
  };

  const getRandomColor = () => {
    const colors = [
      "#FF7F00",
      "#FFA500",
      "#FFC300",
      "#FFD700",
      "#F9DC5C",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#9C27B0",
      "#AA00FF",
      "#E040FB",
      "#D500F9",
      "#2196F3",
      "#00BFFF",
      "#0080FF",
      "#0066CC",
      "#F94144",
      "#F3722C",
      "#F8961E",
      "#F9844A",
      "#F9C74F",
      "#90BE6D",
      "#577590",
      "#7F78D2",
      "#9A7AA0",
      "#F94144",
      "#F3722C",
      "#F8961E",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const initialsStyle = {
    backgroundColor: user.initialsColor || getRandomColor(),
  };
  console.log(user.initialsColor );

  return (
    <tr className={styles["table-row"]}>
      <td>{user.id}</td>
      <td>
        <div className={style["initials-circle"]} style={initialsStyle}>
          {getInitials(user.firstName + " " + user.lastName)}
        </div>
      </td>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.isActive}</td>
      <td>{user.generationDate}</td>
      <td>{user.role}</td>
      <td className={styles["actions"]}>
        <ActionButtons onDelete={onDelete} onEdit={onEdit} />
      </td>
    </tr>
  );
};

export default TableUser;
