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
  const token = JSON.parse(localStorage.getItem('user'))

  if (token) {
  //applying token
  config.headers.Authorization = `Bearer ${token['token']}`
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


export default axiosInstance;
