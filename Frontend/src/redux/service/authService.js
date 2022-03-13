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
  console.log('id');
  console.log(id);
  const response = await axiosInstance.put(API_URL + 'verify/' + id);
  return response.data;
};
// delete user
const deleteUser = async (id) => {
  console.log('id');
  console.log(id);
  console.log(axiosInstance.defaults);
  const response = await axiosInstance.put(API_URL + 'deleteaccount/' + id);
  return response.data;
};
// Logout user
const logout = () => {
  localStorage.removeItem('user');
};


const sendMail = async(userEmail) => {
  console.log("USER EMAIL",userEmail);
const data = {
  email: userEmail
}
  const response = await axiosInstance.post(API_URL+"recoverPwdViaMail/",data);
  return response.data;
}
//change password
const changePassword = async(userEmail,newPassword) => {
  const response = await axiosInstance.put(API_URL+"changePassword/"+userEmail,newPassword);
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
  changePassword,
  sendMail,
  verifyCode
};

export default authService;
