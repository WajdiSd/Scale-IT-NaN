import axios from 'axios';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import { dispatch } from '../store';

const API_URL = 'workspace/';
const getWorkspaces = async (id) => {
  const response = await axiosInstance.get(API_URL + id);
  return response.data;
};

const getWorkspace = async (id) => {
  const response = await axiosInstance.get(API_URL +"details/"+ id);
  return response.data;
};

//add workspace
const addworkspace = async (workspaceData, idmember) => {
  // const authState = useSelector((state) => state.auth);
  // const idmember = authState.user._id;
  console.log(workspaceData);
  console.log(idmember);
  const response = await axiosInstance.post(API_URL + '/add/' + idmember, workspaceData);
  return response.data;
};

const workspaceService = {
  getWorkspaces,
  addworkspace,
  getWorkspace,
};

export default workspaceService;
