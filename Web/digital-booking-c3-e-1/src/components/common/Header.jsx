import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <Link to="/" className="noUnderlined">
          <img src="/Digital Booking.svg" alt="logotipo Digital Booking" />
          <h5 className="lemaHeader">Sin equipo no hay aventura</h5>
        </Link>
        <div className="headerBtn">
          <Link to="auth/register">
          <button className="cuentaBtn">Crear cuenta</button>
          </Link>
          <Link to='login'>
          <button className="sesionBtn">Iniciar sesión</button>
          </Link>
        </div>
        <nav>
          <input type="checkbox" id="menu" />
          <label className="menuIcon" htmlFor="menu">
            {" "}
            ☰{" "}
          </label>
          <ul>
            <li>Crear cuenta</li>
            <li>Iniciar sesión</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
