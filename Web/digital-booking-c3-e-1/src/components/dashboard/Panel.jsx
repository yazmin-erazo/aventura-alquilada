import Button from "../resources/dashboard/Button";
import DashboardSection from "../resources/dashboard/DashboardSection";
import styles from "./panel.module.css";
import { FiLayers, FiLock, FiShoppingCart, FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Panel = () => {
  const location = useLocation();

  const MenuItem = ({ to, isActive, children }) => (
    <Link to={to} className={isActive ? styles.activeLink : styles.link}>
      {children}
    </Link>
  );

  return (
    <div className={styles.dashboard}>
      <div>
        <div className={styles.title}>Dashboard</div>
        <hr className={styles.divider} />

        {/* ------------------ USERS ------------------  */}
        <DashboardSection icon={FiUsers} text="Usuarios" />
        <buttonGroup className={styles.buttonGroup}>
          <MenuItem
            to="usuarios/"
            isActive={location.pathname === "/usuarios/"}
          >
            <Button text="Listar todos" />
          </MenuItem>
          <MenuItem
            to="nuevousuario/"
            isActive={location.pathname === "/nuevousuario/"}
          >
            <Button text="Agregar usuario" />
          </MenuItem>
        </buttonGroup>

        {/* ------------------ ROLES ------------------  */}
        <DashboardSection icon={FiLock} text="Roles" />
        <buttonGroup className={styles.buttonGroup}>
          <MenuItem to="roles/" isActive={location.pathname === "/roles/"}>
            <Button text="Listar todos" />
          </MenuItem>
          <MenuItem
            to="nuevorol/"
            isActive={location.pathname === "/nuevorol/"}
          >
            <Button text="Agregar rol" />
          </MenuItem>
        </buttonGroup>

        {/* ------------------ CATEGORY ------------------  */}
        <DashboardSection icon={FiLayers} text="Categorias" />
        <buttonGroup className={styles.buttonGroup}>
          <MenuItem
            to="categorias/"
            isActive={location.pathname === "/categorias/"}
          >
            <Button text="Listar todos" />
          </MenuItem>
          <MenuItem
            to="nuevacategoria/"
            isActive={location.pathname === "/nuevacategoria/"}
          >
            <Button text="Agregar categoría" />
          </MenuItem>
        </buttonGroup>

        {/* ------------------ PRODUCTS ------------------  */}
        <DashboardSection icon={FiShoppingCart} text="Productos" />
        <buttonGroup className={styles.buttonGroup}>
          <MenuItem
            to="administration/"
            isActive={location.pathname === "/administration/"}
          >
            <Button text="Listar todos" />
          </MenuItem>
          <MenuItem
            to="administration/add/"
            isActive={location.pathname === "/administration/add"}
          >
            <Button text="Agregar producto" />
          </MenuItem>
        </buttonGroup>
      </div>
    </div>
  );
};

export default Panel;
