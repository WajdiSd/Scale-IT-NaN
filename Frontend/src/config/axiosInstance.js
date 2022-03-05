import axios from "axios";
import RootState from "../redux/store";

var token = localStorage.getItem("scaleit_token");


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });

  export const setAuthToken = (config) => {
    if (token) {
    //applying token
    config.headers.Authorization = `Bearer ${token}`
    } else {
    //deleting the token from header
      delete config.headers.Authorization;
    }
  }

  const responseHandler = response => {
    return response;
  };
  const errorHandler = error => {
  return Promise.reject(error);
  };
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    setAuthToken(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  );
  export default axiosInstance;
