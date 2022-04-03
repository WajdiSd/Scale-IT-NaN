import axiosInstance from 'src/utils/axios';

const API_URL = 'task/';

//add project
const addTask = async (data) => {
  const response = await axiosInstance.post(API_URL + 'add/', data);
  return response.data;
};

//get projects from Workspace for Hr and Project Manager
const getTasksByProject = async (idWorkspace) => {
  const response = await axiosInstance.get(API_URL + 'list/' + idWorkspace);
  return response.data;
};

const taskService = {
  addTask,
  getTasksByProject,
};

export default taskService;
