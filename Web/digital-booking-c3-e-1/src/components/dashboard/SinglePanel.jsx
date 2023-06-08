import { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import DashboardSection from "../resources/dashboard/DashboardSection";
import styles from "./panel.module.css";
import { FiLayers, FiBriefcase, FiUsers } from "react-icons/fi";
import { BiGridAlt } from "react-icons/bi";
import { useLocation } from "react-router-dom";


const SinglePanel = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return (
    <>
      {user.role === "Admin" && (
        <div className={styles.dashboard}>
          <div className={styles.content}>
            <div className={styles.title}>Dashboard</div>
            <hr className={styles.divider} />

            {/* ------------------ USERS ------------------ */}

            <DashboardSection
              icon={FiUsers}
              size={24}
              text="Usuarios"
              to="#"
              isActive={location.pathname === "/#"}
            >
            </DashboardSection>

            {/* ------------------ ROLES ------------------ */}
            <DashboardSection
              icon={FiBriefcase}
              size={24}
              text="Roles"
              to="admin/role"
              isActive={location.pathname === "/admin/role" || location.pathname === "/admin/role/add"}
            >
            </DashboardSection>

            {/* ------------------ CATEGORY ------------------ */}
            <DashboardSection
              icon={BiGridAlt}
              size={24}
              text="Categorias"
              to="admin/category/list"
              isActive={location.pathname === "/admin/category/list" || location.pathname === "/admin/category/add"}
            >
            </DashboardSection>

            {/* ------------------ PRODUCTS ------------------ */}
            <DashboardSection
              icon={FiLayers}
              size={24}
              text="Productos"
              to="admin/"
              isActive={location.pathname === "/admin/" || location.pathname === "/admin/product/add"}
            >
            </DashboardSection>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePanel;
