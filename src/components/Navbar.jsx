import { Link, useLocation } from "react-router-dom";
import argos from "./../assets/nav-argos.png";

const Navbar = () => {
  const location = useLocation();

  const closeSession = () => {
    sessionStorage.removeItem("token");
    window.location.reload(false);
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img src={argos} alt="Logo Argos" width="200px" hidden="80px" />
        </a>
        <div
          className="hidden w-full md:block md:w-auto justify-end"
          id="navbar-default"
        >
          <ul className="flex flex-col p-1 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-white items-center">
            <li>
              <Link
                className={`${location.pathname === "/" && "text-green-600"}`}
                to="/"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/streaming" && "text-green-600"
                }`}
                to="/streaming"
              >
                {"  "}En vivo
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/videos" && "text-green-600"
                }`}
                to="/videos"
              >
                Almacén
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/estadisticas" && "text-green-600"
                }`}
                to="/estadisticas"
              >
                Estadísticas
              </Link>
            </li>
            {/* <li>
              <Link to="/about">Acerca de</Link>
            </li> */}
            <li>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded ml-2"
                onClick={closeSession}
              >
                Cerrar sesión
              </button>
              {/* <Link to="/">Cerrar sesión</Link> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
