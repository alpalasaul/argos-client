import { useEffect, useState } from "react";
import Frame from "./Frame";
import listObjectsBucket from "./../utils/aws-exports.js";
import { getAllCameras, formatDate } from "../utils/utilities.js";
import Spinner from "./Spinner";

const ListFrames = () => {
  const [numPage, setNumPage] = useState(0);
  const [counter, setCounter] = useState(1);
  const [page, setPage] = useState([]);
  const [sheets, setSheets] = useState({});
  const [fecha, setFecha] = useState(new Date());
  const [check, setCheck] = useState("");
  const [calendar, setCalendar] = useState(formatDate(fecha));
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // getData();
    getAllCameras().then((res) => {
      setSources(res.data);
    });
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (counter === 1) {
        getData();
      }
    }, 2000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [check, calendar]);

  const getData = async () => {
    setCounter(1);
    const initPage = 1;
    let fetchData = await listObjectsBucket();
    const filterVideos = filterByCalendar(fetchData);
    let res = filterVideos.length / 6;
    let numPages = Number.isInteger(res) ? res : parseInt(res) + 1;
    setNumPage(numPages);
    let paginador = paginator(numPages, filterVideos);
    setSheets(paginador);
    setPage(paginador[initPage]);
    setIsLoading(false);
  };

  const nextPage = () => {
    if (counter < numPage) {
      setCounter(counter + 1);
      setPage(sheets[counter + 1]);
    }
  };

  const previusPage = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      setPage(sheets[counter - 1]);
    }
  };

  const filterByCalendar = (fetchData) => {
    // filtrar por el valor que está seleccionado
    const dataFilter = fetchData.filter((bucket) => {
      const { id: name, date } = bucket;
      const fecha = formatDate(new Date(date * 1000));
      return fecha === calendar; // && name.split("_")[0] === check;
    });
    return dataFilter;
  };

  const paginator = (numPages, fetchData) => {
    let pagin = {};
    for (let i = 0; i < numPages; i++) {
      pagin[i + 1] = fetchData.slice(6 * i, 6 * (i + 1));
    }
    return pagin;
  };

  return (
    <div>
      <div>
        <p className="text-3xl mt-5 text-center mb-5 font-bold">
          Todos los objetos {""}
          <span className="text-green-600 font-bold">
            detectados por el modelo {""}
          </span>
          aparecerán aquí 🕵🏻
        </p>
      </div>
      <div className="flex justify-around mb-5">
        <button
          className="bg-white hover:bg-gray-400 hover:text-white text-gray-500 font-bold py-2 px-4 rounded"
          onClick={previusPage}
        >
          Página anterior
        </button>

        <input
          id="fecha"
          type="date"
          className="border-2 px-2 placeholder-gray-400 rounded-md"
          value={calendar}
          onChange={(e) => setCalendar(e.target.value)}
        />

        <div>
          <span className="bg-white text-gray-500 font-bold py-2 px-4 rounded mx-1 flex justify-items-center">
            Página: {counter} de {numPage}
          </span>
        </div>

        <select
          className="border-2 px-2 placeholder-gray-400 rounded-md bg-white"
          name="sources"
          id="sources"
          value={check}
          onChange={(e) => setCheck(e.target.value)}
        >
          <option value="none" hidden>
            Selecciona una cámara
          </option>
          {sources.map((source) => {
            return (
              <option key={source.ip} value={source.ip}>
                {source.name}
              </option>
            );
          })}
        </select>

        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextPage}
        >
          Página siguiente
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center mt-48">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {page && page.length ? (
            page.map((bucket) => <Frame key={bucket.id} bucket={bucket} />)
          ) : (
            <div>
              <p className="text-lg mt-5 text-center mb-5">
                No hay videos para mostrar, carga una {""}
                <span className="text-green-600 font-bold">
                  {" "}
                  fuente de video {""}
                </span>
                y aparecerán aquí.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListFrames;
