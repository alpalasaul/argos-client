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
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import axios from "axios";

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

const SERVER = "";

const Estadistica = () => {
  const [fecha, setFecha] = useState(new Date());
  const [infractores, setInfractores] = useState([]);
  const [noIfractores, setNoInfractores] = useState([]);

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
    fetchData()
      .then((res) => {
        if (res !== null) {
        }
        setInfractores(
          labels.map(() => faker.datatype.number({ min: 0, max: 10 }))
        );
        setNoInfractores(
          labels.map(() => faker.datatype.number({ min: 0, max: 10 }))
        );
      })
      .catch((err) => {
        console.log("Error al cargar datos iniciales");
      });
  }, []);

  const pushData = () => {
    // logica para almacenar la información en arreglos y hacer el set de infra y no infra
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(SERVER + "/fetch", {
        params: {
          date: fecha.toISOString().split("T")[0],
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const nextDate = () => {
    fetchData().then((data) => {
      if (data !== null) {
        setFecha(addDaysToDate(fecha, 1));
      }
      setInfractores([1, 2, 10, 34, 2, 6, 3, 2, 9, 0, 0, 4, 1]);
      setNoInfractores([6, 5, 8, 0, 0, 0, 4, 5, 6, 7, 14, 6, 7]);
    });
  };

  const previusDate = () => {
    fetchData().then((data) => {
      if (data !== null) {
        setFecha(addDaysToDate(fecha, -1));
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
        label: "Personas con casco",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        data: infractores,
        borderColor: "rgb(21 128 61)",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        tension: 0.3,
      },
      {
        fill: true,
        label: "Personas sin casco",
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
