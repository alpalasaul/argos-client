import { Link } from "react-router-dom"
import uce from './../assets/uce.png'

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <span className="text-3xl mr-2">😎</span>
          <span className="self-center text-xl font-semibold whitespace-nowrap uppercase">Helmet Detection</span>
        </a>
        <a href="/" className="flex items-center">
          <img src={ uce } alt="Logo Uce" width="80Spx" hidden="80px" />
        </a>
        <div className="hidden w-full md:block md:w-auto uppercase" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/streaming">{'  '}Streaming</Link>
            </li>
            <li>
              <Link to="/videos">Videos</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar