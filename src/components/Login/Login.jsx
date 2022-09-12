import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Credential from "./Credential";
import Register from "./Register";

import "./Login.css";
import argos from "./../../assets/home-args.png";

const SERVER = "http://170.187.144.166";

async function loginUser(credentials) {
  const { username, password } = credentials;

  if ([username, password].includes("")) {
    NotificationManager.warning("Todos los campos son necesarios");
    return;
  }

  let response = "";
  try {
    const token = await axios.post(SERVER + "/auth/login", {
      username,
      password,
    });
    response = token.data;
  } catch (err) {
    NotificationManager.error("Los datos ingresados son incorrectos");
  }
  return response;
}

const Login = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="relative min-h-screen flex">
      <NotificationContainer />

      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div
          className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);"`,
          }}
        >
          <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
          <div className="w-full  max-w-md z-10">
            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
              <img src={argos} alt="Logo Argos" width="400px" hidden="80px" />
            </div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
              {" "}
              Somos una plataforma en línea disponible para todo el mundo.
              Usamos inteligencia artifical para el procesamiento y detección de
              objetos.
            </div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
              {" "}
              Procesamos los video casi en tiempo real con 2 fuentes
              disponibles: YouTube y RTSP. Implementamos una capa de seguridad
              para la transmisión segura de video a través de RTSP.
            </div>
          </div>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            {!isNewUser ? (
              <Credential
                handleSubmit={handleSubmit}
                setUserName={setUserName}
                setPassword={setPassword}
                setIsNewUser={setIsNewUser}
              />
            ) : (
              <Register setIsNewUser={setIsNewUser}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
