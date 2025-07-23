import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://real-estate-serverside.vercel.app`,
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
