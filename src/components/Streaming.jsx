import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ReactPlayer from "react-player";

// const SERVER_HTTP = "http://50.116.23.81";
const SERVER_HTTP = "https://cool-squids-act-34-143-176-62.loca.lt";
const SERVER_RSTP = "http://173.255.219.215";

const Streaming = ({
  urlStreaming,
  setUrlStreaming,
  show,
  setShow,
  typeVideo,
  setTypeVideo,
  setUrlBaseRtsp,
}) => {
  const [source, setSource] = useState("");

  const openStream = async () => {
    if (source === "") {
      NotificationManager.warning("Ingrese un URL o RTSP válido");
      return;
    }

    let urlStreaming = source.includes("https://www.youtube.com")
      ? handleHttp()
      : await handleRstp(source);

    let id = source.includes("https://www.youtube.com")
      ? handleSaveIdHttp(source)
      : handleSaveIdRtsp(source);

    try {
      console.log(id, "******* current id");
      const response = await axios.get(SERVER_HTTP + "/stream", {
        params: {
          stream_url: source.includes("rtsp://")
            ? source.replace("stream1", "stream2")
            : source,
          stream_save: id,
        },
      });
      setShow(true);
      setUrlStreaming(urlStreaming); // para el iframe así como para react player
      NotificationManager.success(response.data.msg);
    } catch (err) {
      NotificationManager.error(err.response.data.msg);
    }
  };

  const handleHttp = () => {
    let idStream = source;
    const id = handleSaveIdHttp(idStream);
    const urlStreaming = `https://www.youtube.com/embed/${id}?controls=0&autoplay=1`;
    setTypeVideo("https");
    return urlStreaming;
  };

  const handleSaveIdHttp = (url) => {
    let replace = url.replace("https://www.youtube.com/watch?v=", "");
    let split = replace.split("&");
    let id = split[0];
    return id;
  };

  const handleSaveIdRtsp = (url) => {
    const id = url.split("@")[1].split("/")[0];
    return id;
  };

  const handleRstp = async (urlRtsp) => {
    try {
      NotificationManager.info("Solicitando video HLS al servidor");
      const response = await axios.post(SERVER_RSTP + "/start", {
        uri: urlRtsp, // dinamico
        alias: "helmet-cam",
      });
      const uri = response.data.uri;
      setTypeVideo("rtsp");
      NotificationManager.success("Servidor HLS iniciado");
      setUrlBaseRtsp(urlRtsp);
      return SERVER_RSTP + uri;
    } catch (err) {
      console.log(err);
      NotificationManager.error("Error al inicar el servidor HLS");
    }
    throw new Error("No se pudo inicial el servidor HLS");
  };

  const closeStream = async () => {
    try {
      const response = await axios.get(SERVER_HTTP + "/stop");
      if (typeVideo === "rtsp") await closeStreamRtspServer();
      NotificationManager.warning(response.data.msg);
    } catch (err) {
      NotificationManager.error(err.response.data.msg);
    } finally {
      setUrlStreaming("");
      setSource("");
      setShow(false);
      setUrlBaseRtsp("");
      setTypeVideo("");
    }
  };

  const closeStreamRtspServer = async () => {
    try {
      const response = await axios.post(SERVER_RSTP + "/stop", {
        alias: "helmet-cam",
        remove: true,
        wait: false,
      });
      if (response.status === 200) {
        NotificationManager.success("Servidor HLS cerrado");
      } else {
        NotificationManager.error("Error al cerrar servidor HLS");
      }
    } catch (err) {
      console.log(err);
      NotificationManager.error(err.response.data.msg);
    }
    return "";
  };

  return (
    <div>
      <p className="text-3xl mt-5 text-center mb-5 font-bold">
        Transmisión {""}
        <span className="text-green-600 font-bold">en vivo </span>
        de una fuente de video
      </p>

      <NotificationContainer />

      <div className="flex justify-center">
        <input
          id="mascota"
          type="text"
          placeholder="URL de tipo https:// o rtsp://"
          className="border-2 w-1/3 p-2 placeholder-gray-400 rounded-md text-gray-500"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        {!urlStreaming ? (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={openStream}
          >
            Iniciar
          </button>
        ) : (
          <button
            className="bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={closeStream}
          >
            Detener
          </button>
        )}
      </div>

      {show ? (
        <div>
          <div className="flex justify-center mt-5">
            {typeVideo === "http" ? (
              <iframe
                width="854"
                height="480"
                src={urlStreaming}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <ReactPlayer url={urlStreaming} playing={true} />
            )}
          </div>
          <div className="flex justify-center mt-5">
            <div className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-2">
              <Link to="/videos">Ver detecciones de casco</Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-lg mt-5 text-center mb-5">
            Ingresa un enlace para comenzar a {""}
            <span className="text-green-600 font-bold"> capturar {""}</span>
            el stream y mandarlos al modelo de machine learning.
          </p>
        </div>
      )}
    </div>
  );
};

export default Streaming;
