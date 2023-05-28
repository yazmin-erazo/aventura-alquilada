import Button from "../resources/dashboard/Button";
import DashboardSection from "../resources/dashboard/DashboardSection";
import styles from "./panel.module.css";
import { FiLayers, FiBriefcase, FiUsers } from "react-icons/fi";
import { BiGridAlt } from "react-icons/Bi";
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

        <DashboardSection icon={FiUsers} size={24} text="Usuarios" />
        <MenuItem to="usuarios/" isActive={location.pathname === "/usuarios/"}>
          <Button text="Listar todos" />
        </MenuItem>
        <MenuItem
          to="nuevousuario/"
          isActive={location.pathname === "/nuevousuario/"}
        >
          <Button text="Agregar usuario" />
        </MenuItem>

        {/* ------------------ ROLES ------------------  */}
        <DashboardSection icon={FiBriefcase} size={24} text="Roles" />

        <MenuItem to="roles/" isActive={location.pathname === "/roles/"}>
          <Button text="Listar todos" />
        </MenuItem>
        <MenuItem
          to="admin/role/add/"
          isActive={location.pathname === "/admin/role/add/"}
        >
          <Button text="Agregar rol" />
        </MenuItem>

        {/* ------------------ CATEGORY ------------------  */}
        <DashboardSection icon={BiGridAlt} size={24} text="Categorias" />

        <MenuItem
          to="categorias/"
          isActive={location.pathname === "/categorias/"}
        >
          <Button text="Listar todos" />
        </MenuItem>
        <MenuItem
          to="admin/category/add/"
          isActive={location.pathname === "/admin/category/add/"}
        >
          <Button text="Agregar categoría" />
        </MenuItem>

        {/* ------------------ PRODUCTS ------------------  */}
        <DashboardSection icon={FiLayers} size={24} text="Productos" />

        <MenuItem to="admin/" isActive={location.pathname === "/admin/"}>
          <Button text="Listar todos" />
        </MenuItem>

        <MenuItem
          to="admin/add/"
          isActive={location.pathname === "/admin/add/"}
        >
          <Button text="Agregar producto" />
        </MenuItem>
      </div>
    </div>
  );
};

export default Panel;