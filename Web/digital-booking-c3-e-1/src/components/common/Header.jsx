import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { FiMenu } from "react-icons/fi";
import UsersService from "../../shared/services/UserService";

const Header = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { isLogedIn, user, dispatch } = useContext(UserContext);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [users, setUsers] = useState([]);

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
    setMenuOpen(false);
  };
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const findUserColor = (email) => {
    const foundUser = users.find((user) => user.email === email);
    return foundUser && user.sub === email ? foundUser.initialsColor : "";
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await UsersService.getAll();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="header">
      <div className="headerContainer">
        <Link to="/" className="noUnderlined">
          <img
            src="https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/digital-booking.svg"
            alt="logotipo Digital Booking"
          />
          <h5 className="lemaHeader">Sin equipo no hay aventura</h5>
        </Link>
        {isLogedIn ? (
          <div className="userProfile" ref={profileRef}>
            <input
              type="checkbox"
              id="userData"
              checked={isProfileOpen}
              onChange={toggleProfile}
            />
            <label className="userDataIcon" htmlFor="userData">
              <div className="user-name">{user.name + " " + user.lastname}</div>
              <div
                className="user-logo"
                style={{ backgroundColor: findUserColor(user.sub) }}
              >
                <div>
                  {`${
                    user.name.slice(0, 1) + user.lastname.slice(0, 1)
                  }`.toUpperCase()}
                </div>
              </div>
            </label>
            <ul
              className={isProfileOpen ? "user-profile open" : "user-profile"}
            >
              <li>Perfil</li>
              <hr />
              <Link to= "favs">
              <li>Mis favoritos</li>
              </Link>
              <hr />
              <li>Configuración</li>
              <li className="logout" onClick={logoutHandler}>
                Cerrar Sesión
              </li>
            </ul>
          </div>
        ) : (
          <div className="headerBtn">
            <Link to="auth/register">
              <button className="cuentaBtn" onClick={() => setMenuOpen(false)}>
                Crear cuenta
              </button>
            </Link>
            <Link to="login">
              <button className="sesionBtn" onClick={() => setMenuOpen(false)}>
                Iniciar sesión
              </button>
            </Link>
          </div>
        )}
        <nav className={isLogedIn ? "hideNav" : "showNav"}>
          {isLogedIn ? (
            <ul className="user-profile">
              <li>Perfil</li>
              <hr />
              <Link to="favorites">
                <li> Mis favoritos</li>
              </Link>
              <hr />
              <li>Configuración</li>
              <li className="logout" onClick={logoutHandler}>
                Cerrar Sesión
              </li>
            </ul>
          ) : (
            <div className="headerBtn" ref={menuRef}>
              <input
                type="checkbox"
                id="menuData"
                checked={isMenuOpen}
                onChange={toggleMenu}
              />
              <label
                className={`menuDataIcon ${isMenuOpen ? "active" : ""}`}
                htmlFor="menuData"
              >
                <div className="menuContainerIcon">
                  <FiMenu size={24} />
                </div>
              </label>

              <ul className={isMenuOpen ? "menu-profile open" : "menu-profile"}>
                <Link
                  to="auth/register"
                  className="noUnderlined"
                  onClick={() => setMenuOpen(false)}
                >
                  <li>Crear cuenta</li>
                  <hr />
                </Link>
                <Link
                  to="login"
                  className="noUnderlined"
                  onClick={() => setMenuOpen(false)}
                >
                  <li>Iniciar sesión</li>
                </Link>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
