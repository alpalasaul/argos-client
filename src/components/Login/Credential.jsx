import React from "react";

const Credential = ({ handleSubmit, setUserName, setPassword, setIsNewUser }) => {
  return (
    <div>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          ¡Bienvenido de nuevo!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Inicia sesión con tu cuenta
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="relative">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Usuario
          </label>
          <input
            className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
            type="text"
            placeholder="Ingresa tu correo o nombre de usuario"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mt-8 content-center">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Contraseña
          </label>
          <input
            className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            placeholder="Ingresa tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-900"
            >
              Recuérdame
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-indigo-400 hover:text-blue-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
          >
            Iniciar sesión
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>¿No tiene una cuenta?</span>
          <button
            onClick={() => setIsNewUser(true)}
            className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Registrarse
          </button>
        </p>
      </form>
    </div>
  );
};

export default Credential;
