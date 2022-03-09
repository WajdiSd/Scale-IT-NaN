import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
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
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  setAuthToken(config);
  return config;
}, function (error) {
  // Do something with request error
  console.log("error")
  console.log(error)
  return Promise.reject(error);
});
// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
