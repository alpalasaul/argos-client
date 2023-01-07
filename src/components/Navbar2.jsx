import { Link, useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import argos from "./../assets/nav-argos.png";

const navigation = [
  { name: "Inicio", href: "/", current: true },
  { name: "En vivo", href: "/streaming", current: false },
  { name: "Almacén", href: "/videos", current: false },
  { name: "Estadísticas", href: "/estadisticas", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar2 = () => {
  const location = useLocation();

  const closeSession = () => {
    sessionStorage.removeItem("token");
    window.location.reload(false);
  };

  return (
    <Disclosure as="nav" className="bg-white rounded-md">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center md:items-center md:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-20 w-auto md:hidden"
                    src={argos}
                    alt="Argos Logo"
                    width="200px"
                  />
                  <img
                    className="hidden h-20 w-auto md:block"
                    src={argos}
                    alt="Argos Logo"
                    width="200px"
                  />
                </div>

                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4 font-medium text-lg justify-center items-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-green-600 text-white"
                            : "text-black hover:bg-gray-100 hover:text-green-600",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto flex sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <button
                  className="border hover:text-white border-green-600 hover:bg-green-600 text-green-600 px-3 py-2 rounded-md ml-2 font-medium text-base hidden md:block"
                  onClick={closeSession}
                >
                  Cerrar sesión
                </button>
                <ArrowRightOnRectangleIcon 
                  onClick={closeSession} 
                  className="inline-block h-6 w-6 md:hidden rounded-md text-gray-400 cursor-pointer hover:text-green-600" 
                  aria-hidden="true" />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-green-600 text-white"
                      : "text-black hover:bg-gray-100 hover:text-green-600",
                    "flex px-3 py-2 rounded-md text-base font-medium justify-center"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar2;
