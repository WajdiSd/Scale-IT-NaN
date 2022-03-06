import axiosInstance from "../../config/axiosInstance";

const API_URL = "/api/members/";

// Register member
const register = async (memberData) => {
  // const response = await axios.post(API_URL, memberData);
  const response = await axiosInstance.post(API_URL, memberData);

  if (response.data) {
    localStorage.setItem("member", JSON.stringify(response.data));
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    axiosInstance.defaults.headers[
      "Authorization"
    ] = `Bearer ${response.data.token}`;

    console.log(axiosInstance);
  }

  return response.data;
};

// Login member
const login = async (memberData) => {
  // const response = await axios.post(API_URL + "login", userData);
  const response = await axiosInstance.post(API_URL + "login", memberData);

  if (response.data) {
    localStorage.setItem("member", JSON.stringify(response.data));
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    axiosInstance.defaults.headers[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    console.log(axiosInstance);
  }

  return response.data;
};

// Logout member
const logout = () => {
  localStorage.removeItem("member");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
