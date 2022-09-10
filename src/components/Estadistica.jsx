import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllCameras, formatDate } from "../utils/utilities.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// const SERVER = "https://fair-eagles-play-34-74-178-248.loca.lt";
const SERVER = "http://50.116.23.81";

const Estadistica = ({ typeVideo }) => {
  const [fecha, setFecha] = useState(new Date());
  const [calendar, setCalendar] = useState(fecha.toISOString().split("T")[0]);
  const [infractores, setInfractores] = useState([]);
  const [noIfractores, setNoInfractores] = useState([]);
  const [check, setCheck] = useState("");
  const [sources, setSources] = useState([]);

  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      maintainAspectRatio: false,
      title: {
        display: true,
        text: fecha.toISOString().split("T")[0],
      },
    },
  };

  useEffect(() => {
    let interval = setInterval(() => {
      fetchInit();
    }, 2000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    getAllCameras().then((res) => {
      setSources(res.data);
    });
    fetchInit();
    return () => {
      getAllCameras();
      fetchInit;
    };
  }, []);

  const fetchInit = () => {
    fetchData()
      .then((res) => {
        if (res !== null) {
          pushData(res.data);
        }
      })
      .catch((err) => {
        console.log("Error al cargar datos iniciales");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(new Date(calendar.replaceAll("-0", "-")))
      .then((res) => {
        if (res !== null) {
          pushData(res.data);
        }
      })
      .catch((err) => {
        console.log("Error al cargar datos del calendario");
        console.log(err);
      });
    setFecha(new Date(calendar.replaceAll("-0", "-")));
    return () => {
      fetchData();
      setFecha();
    };
  }, [calendar, check]);

  const pushData = (data) => {
    const dic = data.data;
    let listInfractores = [];
    let listNoInfractores = [];
    for (let i = 0; i < 24; i++) {
      if (dic[i] !== undefined) {
        listInfractores.push(dic[i].num_infracciones);
        listNoInfractores.push(dic[i].num_no_infracciones);
      } else {
        listInfractores.push(0);
        listNoInfractores.push(0);
      }
    }
    setInfractores(listInfractores);
    setNoInfractores(listNoInfractores);
  };

  const fetchData = async (param = fecha) => {
    // const id = getId(urlBaseRtsp, urlStreaming);
    const id = check;

    try {
      const response = await axios.get(SERVER + "/fetch", {
        params: {
          date: param.toISOString().split("T")[0].replace("2022", "22"),
          camara: id,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const getId = (urlRtsp, urlStreaming) => {
    let id = "";
    if (typeVideo === "rtsp") {
      id = urlRtsp.split("@")[1].split("/")[0];
    } else {
      let replace = urlStreaming.replace("https://www.youtube.com/embed/", "");
      let split = replace.split("?");
      id = split[0];
    }
    return id;
  };

  const nextDate = () => {
    const paramFecha = addDaysToDate(fecha, 1);
    fetchData(paramFecha).then((res) => {
      if (res !== null) {
        pushData(res.data);
        setFecha(paramFecha);
        setCalendar(paramFecha.toISOString().split("T")[0]); // verificar si vale
      }
    });
  };

  const previusDate = () => {
    const paramFecha = addDaysToDate(fecha, -1);
    fetchData(paramFecha).then((res) => {
      if (res !== null) {
        pushData(res.data);
        setFecha(paramFecha);
        setCalendar(paramFecha.toISOString().split("T")[0]);
      }
    });
  };

  const addDaysToDate = (date, days) => {
    const res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  };

  const labels = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Objetos detectados sin casco",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        data: infractores,
        borderColor: "rgb(21 128 61)",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        tension: 0.3,
      },
      {
        fill: true,
        label: "Objetos detectados con casco",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        data: noIfractores,
        borderColor: "rgb(55, 65, 81)",
        backgroundColor: "rgba(107, 114, 128, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <p className="text-3xl mt-5 text-center mb-5 font-bold">
        Estadísticas de {""}
        <span className="text-green-600 font-bold"> infractores </span>
        por día y hora
      </p>
      <div className="flex justify-around mb-5">
        <button
          className="bg-white hover:bg-gray-400 hover:text-white text-gray-500 font-bold py-2 px-4 rounded"
          onClick={previusDate}
        >
          Fecha anterior
        </button>

        <input
          id="fecha"
          type="date"
          className="border-2 px-2 placeholder-gray-400 rounded-md"
          value={calendar}
          onChange={(e) => setCalendar(e.target.value)}
        />

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
          onClick={nextDate}
        >
          Fecha siguiente
        </button>
      </div>
      <div>
        <Line options={options} data={data} height={200} width={600} />
      </div>
    </div>
  );
};

export default Estadistica;
