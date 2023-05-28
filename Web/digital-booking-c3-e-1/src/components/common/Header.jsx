import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

const Header = () => {

  const user = useContext(UserContext);

  return (
    <div className="header">
      <div className="headerContainer">
        <Link to="/" className="noUnderlined">
          <img src="/Digital Booking.svg" alt="logotipo Digital Booking" />
          <h5 className="lemaHeader">Sin equipo no hay aventura</h5>
        </Link>
        { user.isLoggedIn ? <div>
          <input type="checkbox" id="userData" />
          <label className="userDataIcon" htmlFor="userData">
            {user.currentUser.name + " " + user.currentUser.lastName}
            <div className="user-Logo">
              {user.currentUser.name.slice(0, 1) + user.currentUser.lastName.slice(0, 1)}
            </div>
          </label>
          <ul className="user-profile">
            <li>Perfil</li>
            <hr />
            <li>Mis favoritos</li>
            <hr />
            <li>Configuración</li>
            <li>Cerrar Sesión</li>
          </ul>
        </div> :
        <div className="headerBtn">
          <Link to="auth/register">
          <button className="cuentaBtn">Crear cuenta</button>
          </Link>
          <Link to='login'>
          <button className="sesionBtn">Iniciar sesión</button>
          </Link>
        </div> 
        }
        <nav>
          <input type="checkbox" id="menu" />
          <label className="menuIcon" htmlFor="menu">
            {" "}
            ☰{" "}
          </label>
          { user.isLoggedIn ? <ul className="user-profile">
            <li>Perfil</li>
            <hr />
            <li>Mis favoritos</li>
            <hr />
            <li>Configuración</li>
            <li>Cerrar Sesión</li>
          </ul> :
          <ul>
            <li>Crear cuenta</li>
            <li>Iniciar sesión</li>
          </ul>
          }
        </nav>
      </div>
    </div>
  );
};

export default Header;
