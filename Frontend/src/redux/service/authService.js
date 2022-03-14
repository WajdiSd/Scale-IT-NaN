import axios from "axios";
import axiosInstance from "src/utils/axios";
import { dispatch } from "../store";

const API_URL = 'members/';

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const updateUser = async(userData) => {
  const id = userData.id;
  delete userData.id;
  const response = await axiosInstance.put(API_URL+"updateaccount/"+id,userData);
  return response.data;
}
// Login user
const login = async (userData) => {
  const response = await axiosInstance.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
  }

  return response.data;
};

// verif user
const updateUserPassword = async (obj) => {
  const response = await axiosInstance.put(API_URL + 'updateUserPassword/' + obj.email, obj);
  return response.data;
};

// verif user
const verifyUser = async (id) => {
  const response = await axiosInstance.put(API_URL + 'verify/' + id);
  return response.data;
};
// delete user
const deleteUser = async (id) => {
  const response = await axiosInstance.put(API_URL + 'deleteaccount/' + id);
  return response.data;
};
// Logout user
const logout = () => {
  localStorage.removeItem('user');
};


const sendCode = async(userData) => {
const data = {
  email: userData.email
}

//control to check if the code will be sent via mail or sms
let path = "";
if(userData.isEmail)
  path = "recoverPwdViaMail/";
else
path = "recoverPwdViaSms/";

  const response = await axiosInstance.post(API_URL+path,data);
  return response.data;
}
//change password
const resetUserPassword = async(obj) => {
  const response = await axiosInstance.put(API_URL+"updatepwd/"+obj.email,obj);
  return response.data;
}

const verifyCode = async(code) => {
  const response = await axiosInstance.put(API_URL+"verifyCode/"+code);
  return response.data;
}

const authService = {
  register,
  logout,
  login,
  verifyUser,
  resetUserPassword,
  sendCode,
  verifyCode,
  updateUserPassword,
  updateUser,
  deleteUser,
};

export default authService;
