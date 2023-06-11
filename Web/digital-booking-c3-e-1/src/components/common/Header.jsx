import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

const Header = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { isLogedIn, user, dispatch } = useContext(UserContext);
  const profileRef = useRef(null);
  const navigate = useNavigate();


  console.log(isProfileOpen);

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
  };

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
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
              <div className="user-logo">
                <div>{user.name.slice(0, 1) + user.lastname.slice(0, 1)}</div>
              </div>
            </label>
            <ul
              className={isProfileOpen ? "user-profile open" : "user-profile"}
            >
              <li>Perfil</li>
              <hr />
              <li>Mis favoritos</li>
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
              <button className="cuentaBtn">Crear cuenta</button>
            </Link>
            <Link to="login">
              <button className="sesionBtn">Iniciar sesión</button>
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
            <>
              <input type="checkbox" id="menu" />
              <label className="menuIcon" htmlFor="menu">
                {" "}
                ☰{" "}
              </label>
              <ul>
                <Link to="auth/register" className="noUnderlined">
                  <li>Crear cuenta</li>
                </Link>
                <Link to="login" className="noUnderlined">
                  <li>Iniciar sesión</li>
                </Link>
              </ul>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
