import { Link, useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-20 w-auto lg:hidden"
                    src={argos}
                    alt="Argos Logo"
                    width="200px"
                    hidden="80px"
                  />
                  <img
                    className="hidden h-20 w-auto lg:block"
                    src={argos}
                    alt="Argos Logo"
                    width="200px"
                    hidden="80px"
                  />
                </div>

                <div className="flex items-center">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 font-medium text-lg">
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
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md ml-2 font-medium text-base"
                  onClick={closeSession}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar2;
