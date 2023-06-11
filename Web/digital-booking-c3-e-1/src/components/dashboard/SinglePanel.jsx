import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/AuthContext";
import DashboardSection from "../resources/dashboard/DashboardSection";
import styles from "./panel.module.css";
import { FiLayers, FiBriefcase, FiUsers, FiMenu } from "react-icons/fi";
import { BiGridAlt } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const SinglePanel = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const storedSection = localStorage.getItem("currentSection");
    if (storedSection) {
      setCurrentSection(storedSection);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentSection", currentSection);
  }, [currentSection]);

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
              to="admin/user/"
              isActive={location.pathname === "/admin/user/"}
              onClick={() => setCurrentSection("Usuarios")}
            />

            {/* ------------------ ROLES ------------------ */}
            <DashboardSection
              icon={FiBriefcase}
              size={24}
              text="Roles"
              to="admin/role"
              isActive={
                location.pathname === "/admin/role" ||
                location.pathname === "/admin/role/add"
              }
              onClick={() => setCurrentSection("Roles")}
            />

            {/* ------------------ CATEGORY ------------------ */}
            <DashboardSection
              icon={BiGridAlt}
              size={24}
              text="Categorias"
              to="admin/category/list"
              isActive={
                location.pathname === "/admin/category/list" ||
                location.pathname === "/admin/category/add"
              }
              onClick={() => setCurrentSection("Categorías")}
            />

            {/* ------------------ PRODUCTS ------------------ */}
            <DashboardSection
              icon={FiLayers}
              size={24}
              text="Productos"
              to="admin/"
              isActive={
                location.pathname === "/admin/" ||
                location.pathname === "/admin/product/add"
              }
              onClick={() => setCurrentSection("Productos")}
            />
          </div>
        </div>
      )}

      {user.role === "admin" && ( // ... menú hamburguesa ...
        <div className={styles.menuContainer}>
          <div className={styles.iconContainer}>
            <div className={styles.menuIcon} onClick={toggleMenu}>
              <FiMenu size={24} />
              {currentSection && location.pathname.includes("admin") && (
                <div className={styles.breadcrumbs}>{currentSection}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ...... EN DISPOSITIVOS DE MAX 768PX ...... */}
      {isMenuOpen && (
        <div className={`${styles.burgerMenuContainer} ${styles.mobileMenu}`}>
          <div className={styles.burgerMenu}>
            <div className={styles.title}>Dashboard</div>

            <hr className={styles.divider} />

            {/* ...... MENU DESPLEGABLE ...... */}
            <div className={styles["sectionsContainer"]}>
              {/* ------------------ USERS ------------------ */}
              <div className={styles["dashboard-section"]}>
                <Link
                  to="admin/user/"
                  onClick={() => {
                    setCurrentSection("Usuarios");
                    toggleMenu();
                  }}
                >
                  <div className={styles.section}>
                    <FiUsers />
                    <div> Usuarios</div>
                  </div>
                </Link>
              </div>
              {/* ------------------ ROLES ------------------ */}
              <div className={styles["dashboard-section"]}>
                <Link
                  to="admin/role"
                  onClick={() => {
                    setCurrentSection("Roles");
                    toggleMenu();
                  }}
                >
                  <div className={styles.section}>
                    <FiBriefcase />
                    <div> Roles</div>
                  </div>
                </Link>
              </div>
              {/* ------------------ CATEGORY ------------------ */}
              <div className={styles["dashboard-section"]}>
                <Link
                  to="admin/category/list"
                  onClick={() => {
                    setCurrentSection("Categorías");
                    toggleMenu();
                  }}
                >
                  <div className={styles.section}>
                    <BiGridAlt />
                    <div>Categorías</div>
                  </div>
                </Link>
              </div>
              {/* ------------------ PRODUCTS ------------------ */}
              <div className={styles["dashboard-section"]}>
                <Link
                  to="admin/"
                  onClick={() => {
                    setCurrentSection("Productos");
                    toggleMenu();
                  }}
                >
                  <div className={styles.section}>
                    <FiLayers /> <div>Productos</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePanel;
