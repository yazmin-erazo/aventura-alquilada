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
            to="admin/usuario/"
            isActive={location.pathname === "/admin/usuario/"}
          >
            <Button text="Listar todos" />
          </MenuItem>
          <MenuItem
            to="admin/usuario/add"
            isActive={location.pathname === "admin/usuario/add"}
          >
            <Button text="Agregar usuario" />
          </MenuItem>
        </buttonGroup>

        {/* ------------------ ROLES ------------------  */}
        <DashboardSection icon={FiLock} text="Roles" />
        <buttonGroup className={styles.buttonGroup}>
          <MenuItem to="admin/role/" isActive={location.pathname === "/admin/role/"}>
            <Button text="Listar todos" />
          </MenuItem>
          <MenuItem
            to="admin/role/add"
            isActive={location.pathname === "/admin/role/add"}
          >
            <Button text="Agregar rol" />
          </MenuItem>
        </buttonGroup>

        {/* ------------------ CATEGORY ------------------  */}
        <DashboardSection icon={FiLayers} text="Categorias" />
        <buttonGroup className={styles.buttonGroup}>
          <MenuItem
            to="admin/category/"
            isActive={location.pathname === "/admin/category/"}
          >
            <Button text="Listar todos" />
          </MenuItem>
          <MenuItem
            to="admin/category/add"
            isActive={location.pathname === "admin/category/add"}
          >
            <Button text="Agregar categoría" />
          </MenuItem>
        </buttonGroup>

        {/* ------------------ PRODUCTS ------------------  */}
        <DashboardSection icon={FiShoppingCart} text="Productos" />
        <buttonGroup className={styles.buttonGroup}>
          <MenuItem
            to="admin/"
            isActive={location.pathname === "/admin/"}
          >
            <Button text="Listar todos" />
          </MenuItem>
          <MenuItem
            to="admin/add/"
            isActive={location.pathname === "/admin/add"}
          >
            <Button text="Agregar producto" />
          </MenuItem>
        </buttonGroup>
      </div>
    </div>
  );
};

export default Panel;
