import axios from "axios";
import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
// import AuthContext from "../Context/AuthContext";

const axiosSecure = axios.create({
  // baseURL: `https://real-estate-serverside.vercel.app`,
  baseURL: `https://real-estate-serverside.vercel.app`,
  withCredentials: true,
});

const AxiosSecure = () => {
  const { user, logOutUser } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) {
      axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => Promise.reject(error)
      );
    }

    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401) {
          logOutUser().then(() => navigate("/login"));
        } else if (status === 403) {
          navigate("/forbidden");
        }
        return Promise.reject(error);
      }
    );
  }, [user?.accessToken, logOutUser, navigate]);

  return axiosSecure;
};

export default AxiosSecure;
