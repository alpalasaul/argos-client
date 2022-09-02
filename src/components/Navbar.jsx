import { Link, useNavigate } from "react-router-dom"
import argos from './../assets/nav-argos.png'

const Navbar = () => {

  const closeSession = () => {
    sessionStorage.removeItem('token');
    window.location.reload(false);
  }

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <img src={ argos } alt="Logo Argos" width="200px" hidden="80px" />
        </a>
        <div className="hidden w-full md:block md:w-auto uppercase" id="navbar-default">
          <ul className="flex flex-col p-1 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/streaming">{'  '}Video en vivo</Link>
            </li>
            <li>
              <Link to="/videos">Mis videos</Link>
            </li>
            {/* <li>
              <Link to="/about">Acerca de</Link>
            </li> */}
            <li>
              <button className="uppercase" onClick={closeSession}>Cerrar sesión</button>
              {/* <Link to="/">Cerrar sesión</Link> */}
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar