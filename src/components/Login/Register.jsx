import { useState } from "react";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const SERVER = "http://170.187.144.166";

async function registerUser(credentials) {
  const { username, password, password2, email } = credentials;

  let response = "";
  try {
    const token = await axios.post(SERVER + "/auth/register", {
      username,
      password,
      email,
      role: ["user", "admin"],
    });
    response = token.status;
    NotificationManager.info(token.data.message);
  } catch (err) {
    NotificationManager.error(err.response.data.message);
  }
  return response;
}

const Register = ({ setIsNewUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([username, email, password, password2].includes("")) {
      NotificationManager.warning("Todos los campos son necesarios");
      return;
    }
    if (password !== password2) {
      NotificationManager.warning("Las contraseñas no coinciden");
      return;
    }

    const response = await registerUser({
      username,
      password,
      password2,
      email,
    });

    if (response === 200) setIsNewUser(false);
  };

  return (
    <div>
      <NotificationContainer />
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          ¡Crea una nueva cuenta!
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Es rápido y sencillo para comenzar a monitorear hoy mismo
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
            placeholder="Ingresa un nombre de usuario"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="relative">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Correo
          </label>
          <input
            className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
            type="email"
            placeholder="Ingresa tu correo electrónico"
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mt-8 content-center">
          <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
            Confirmar contraseña
          </label>
          <input
            className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            placeholder="Ingresa nuevamente tu contraseña"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
          >
            Crear cuenta
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>¿Ya tienes cuenta?</span>
          <button
            onClick={() => setIsNewUser(false)}
            className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
