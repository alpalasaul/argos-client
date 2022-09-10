import axios from "axios";

// const SERVER = "https://fair-eagles-play-34-74-178-248.loca.lt";
const SERVER = "http://50.116.23.81";

export const getAllCameras = async () => {
  const response = await axios.get(SERVER + "/fetchAllCameras");
  return response.data;
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB").split("/").reverse().join("-");
};
