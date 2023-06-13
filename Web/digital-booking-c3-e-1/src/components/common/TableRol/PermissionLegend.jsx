import React from "react";
import styles from "./PermissionLegend.module.css";

const PermissionLegend = () => {
  return (
    <table className={styles.legendTable}>
      <thead>
        <tr>
          <th>Tipo de Permiso</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Categorías</td>
          <td>
            <span
              className={styles.colorBlock}
              style={{ backgroundColor: "#04acb8" }}
            ></span>
            <span className={styles.colorName}>#e2f3f5</span>
          </td>
        </tr>
        <tr>
          <td>Productos</td>
          <td>
            <span
              className={styles.colorBlock}
              style={{ backgroundColor: "#96c466" }}
            ></span>
            <span className={styles.colorName}>#eaf0d9</span>
          </td>
        </tr>
        <tr>
          <td>Usuarios</td>
          <td>
            <span
              className={styles.colorBlock}
              style={{ backgroundColor: "#fa8d8d" }}
            ></span>
            <span className={styles.colorName}>#f8e5e5</span>
          </td>
        </tr>
        <tr>
          <td>Roles</td>
          <td>
            <span
              className={styles.colorBlock}
              style={{ backgroundColor: "#b666cc" }}
            ></span>
            <span className={styles.colorName}>#f5e8fb</span>
          </td>
        </tr>
        <tr>
          <td>Rentas</td>
          <td>
            <span
              className={styles.colorBlock}
              style={{ backgroundColor: "#979797" }}
            ></span>
            <span className={styles.colorName}>#e0e0e0</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PermissionLegend;
