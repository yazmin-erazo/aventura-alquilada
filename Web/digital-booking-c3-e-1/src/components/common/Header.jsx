import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <Link to="/">
          <img src="/Digital Booking.svg" alt="logotipo Digital Booking" />
        </Link>
        <div className="headerBtn">
          <button className="cuentaBtn">Crear cuenta</button>
          <button className="sesionBtn">Iniciar sesión</button>
        </div>
        <nav>
          <input type="checkbox" id="menu" />
          <label className="menuIcon" for="menu">
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
