import axios from 'axios';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import { dispatch } from '../store';

const API_URL = 'project/';

//add project
const addProject = async (data) => {
  const response = await axiosInstance.post(API_URL + 'add/', data);
  return response.data;
};

const projectService = {
  addProject,
};

export default projectService;
