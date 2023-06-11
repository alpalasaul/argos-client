import axios from "axios";

// const SERVER = "https://fair-eagles-play-34-74-178-248.loca.lt";
const SERVER = "http://50.116.23.81";

// Salta automaticamente el mensaje que sale con ngrok
const axiosConfig = axios.create({
  baseURL: SERVER,
  Headers: {
    "ngrok-skip-browser-warning": "true"
  }
})

export const getAllCameras = async () => {
  // TODO: revisar que funcione 
  const response = await axiosConfig.get("/fetchAllCameras");
  return response.data;
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB").split("/").reverse().join("-");
};
