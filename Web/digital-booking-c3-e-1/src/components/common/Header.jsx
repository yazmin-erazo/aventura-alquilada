import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

const Header = () => {

  const {isLogedIn, user, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch({type: "LOGOUT"})
    navigate('/');
  }

  return (
    <div className="header">
      <div className="headerContainer">
        <Link to="/" className="noUnderlined">
          <img src="/Digital Booking.svg" alt="logotipo Digital Booking" />
          <h5 className="lemaHeader">Sin equipo no hay aventura</h5>
        </Link>
        { isLogedIn ? <div>
          <input type="checkbox" id="userData" />
          <label className="userDataIcon" htmlFor="userData">
            <div className="user-name">
              {user.name + " " + user.lastname}
            </div>
            <div className="user-logo">
              <div>
                {user.name.slice(0, 1) + user.lastname.slice(0, 1)}
              </div>
            </div>
          </label>
          <ul className="user-profile">
            <li>Perfil</li>
            <hr />
            <li>Mis favoritos</li>
            <hr />
            <li>Configuración</li>
            <li className="logout" onClick={logoutHandler}>Cerrar Sesión</li>
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
          { isLogedIn ? <ul className="user-profile">
            <li>Perfil</li>
            <hr />
            <li>Mis favoritos</li>
            <hr />
            <li>Configuración</li>
            <li className="logout" onClick={logoutHandler}>Cerrar Sesión</li>
          </ul> :
          <>
          <input type="checkbox" id="menu" />
          <label className="menuIcon" htmlFor="menu">
            {" "}
            ☰{" "}
          </label>
          <ul>
            <Link to ="auth/register"className="noUnderlined">
            <li>Crear cuenta</li>
            </Link>
            <Link to='login'className="noUnderlined">
            <li>Iniciar sesión</li>
            </Link>
          </ul>
          </>
          }
        </nav>
      </div>
    </div>
  );
};

export default Header;
