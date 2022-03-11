import axios from "axios";
import axiosInstance from "src/utils/axios";

const API_URL = "members/";

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post(API_URL+"login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    axiosInstance.defaults.headers[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  }



  return response.data;
};

// Login user
const verifyUser = async (id) => {
  console.log("id");
  console.log(id);
  const response = await axiosInstance.put(API_URL+"verify/"+id);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  verifyUser,
};

export default authService;
