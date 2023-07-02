import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

import styles from "./panel.module.css";
import { FiLayers, FiBriefcase, FiUsers, FiMenu, FiX } from "react-icons/fi";
import { BiGridAlt } from "react-icons/bi";
import { TfiLocationPin } from "react-icons/tfi";
import DashboardSection from "../resources/dashboard/DashboardSection";

const SinglePanel = ({ onMenuOpenChange }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  const toggleMenu = () => {
    const newMenuOpenState = !isMenuOpen;
    setMenuOpen(newMenuOpenState);
    onMenuOpenChange(newMenuOpenState);
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
        <div className={`${styles.dashboard} ${isMenuOpen ? "" : styles.menuClosed}`}>
          <div className={styles.content}>
            <div className={styles.toggleIcon} onClick={toggleMenu}>
              {isMenuOpen ? (
                <div className={styles.title}>
                  <p>Dashboard</p>
                  <FiX size={24} />
                </div>
              ) : (
                <FiMenu size={24} />
              )}
            </div>
            {isMenuOpen ? <hr className={styles.divider} /> : ""}

            {/* ------------------ USERS ------------------ */}
            <DashboardSection
              className={styles.dashboardSection}
              icon={FiUsers}
              size={24}
              text="Usuarios"
              to="admin/user/"
              isActive={location.pathname === "/admin/user/"}
              onClick={() => setCurrentSection("Usuarios")}
              isMenuOpen={isMenuOpen}
            />

            {/* ------------------ ROLES ------------------ */}
            <DashboardSection
              className={styles.dashboardSection}
              icon={FiBriefcase}
              size={24}
              text="Roles"
              to="admin/role"
              isActive={
                location.pathname === "/admin/role" ||
                location.pathname === "/admin/role/add"
              }
              onClick={() => setCurrentSection("Roles")}
              isMenuOpen={isMenuOpen}
            />

            {/* ------------------ CATEGORY ------------------ */}
            <DashboardSection
              className={styles.dashboardSection}
              icon={BiGridAlt}
              size={24}
              text="Categorias"
              to="admin/category/list"
              isActive={
                location.pathname === "/admin/category/list" ||
                location.pathname === "/admin/category/add"
              }
              onClick={() => setCurrentSection("Categorías")}
              isMenuOpen={isMenuOpen}
            />

            {/* ------------------ PRODUCTS ------------------ */}
            <DashboardSection
              className={styles.dashboardSection}
              icon={FiLayers}
              size={24}
              text="Productos"
              to="admin/"
              isActive={
                location.pathname === "/admin/" ||
                location.pathname === "/admin/product/add"
              }
              onClick={() => setCurrentSection("Productos")}
              isMenuOpen={isMenuOpen}
            />

            {/* ------------------ CITIES ------------------ */}
            <DashboardSection
              className={styles.dashboardSection}
              icon={TfiLocationPin}
              size={24}
              text="Ciudades"
              to="admin/city/"
              isActive={
                location.pathname === "/admin/city/" ||
                location.pathname === "/admin/city/add" ||
                location.pathname === "/admin/city/edit"
              }
              onClick={() => setCurrentSection("Ciudades")}
              isMenuOpen={isMenuOpen}
            />
          </div>
        </div>
      )}

      {user.role === "Admin" && ( // ... menú hamburguesa ...
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
        
        <div className={`${styles.burgerMenuContainer} ${styles.mobileMenu} ${isMenuOpen ? "" : styles.menuClosed}`}>
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
              {/* ------------------ CIUDADES ------------------ */}
              <div className={styles["dashboard-section"]}>
                <Link
                  to="admin/city/"
                  onClick={() => {
                    setCurrentSection("Ciudades");
                    toggleMenu();
                  }}
                >
                  <div className={styles.section}>
                    <TfiLocationPin /> <div>Ciudades</div>
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
