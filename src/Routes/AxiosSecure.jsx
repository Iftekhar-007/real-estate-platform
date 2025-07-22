// import axios from "axios";
// import React, { use } from "react";
// // import Context from "../Contexts/Context";
// import { Navigate, useNavigate } from "react-router";
// import AuthContext from "../Context/AuthContext";

// const axiosSecure = axios.create({
//   baseURL: `http://localhost:5000`,
//   withCredentials: true,
// });

// const AxiosSecure = () => {
//   const { user, logOutUser } = use(AuthContext);
//   const navigate = useNavigate();
//   axiosSecure.interceptors.request.use(
//     (config) => {
//       config.headers.Authorization = `Bearer ${user?.accessToken}`;

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axiosSecure.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       console.log(error.status);
//       const status = error.status;
//       if (status === 401) {
//         logOutUser()
//           .then(() => {
//             navigate("/login");
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } else if (status === 403) {
//         console.log("forbidden access!!!!");
//         navigate("/forbidden");
//       }
//       return Promise.reject(error);
//     }
//   );
//   return axiosSecure;
// };

// export default AxiosSecure;

import axios from "axios";
import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../Context/AuthContext";
// import AuthContext from "../Context/AuthContext";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
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
