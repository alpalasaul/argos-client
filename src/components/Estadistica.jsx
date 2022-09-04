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
import { useState } from "react";

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

const Estadistica = () => {
  const [fecha, setFecha] = useState(new Date().toLocaleDateString());

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "02/09/2022",
      },
    },
  };

  const nextDate = () => {

  }

  const previusDate = () => {
    
  }

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
        label: "Número de infractores por hora",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        borderColor: "rgb(21 128 61)",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
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
          //   onClick={previusPage}
        >
          Fecha anterior
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          //   onClick={nextPage}
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
