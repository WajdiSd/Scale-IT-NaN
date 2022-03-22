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
  const response = await axiosInstance.get(API_URL + 'details/' + id);
  return response.data;
};

//add workspace
const addworkspace = async (workspaceData, idmember) => {
  const response = await axiosInstance.post(API_URL + '/add/' + idmember, workspaceData);
  return response.data;
};

//delete workspace
const deleteworkspace = async (idworkspace, idmember) => {
  const response = await axiosInstance.put(API_URL + '/deleteworkspace/' + idworkspace + '/' + idmember);
  return response.data;
};
//get users by workspace
const getUsersWorkspace = async (id) => {
  const response = await axiosInstance.get(API_URL + '/fetch-users/' + id);
  return response.data;
};


const updateWorkspace = async (workspaceData, idmember) => {
  const response = await axiosInstance.put(API_URL + '/update/' + idmember, workspaceData);
  return response.data;
};
//remove member from workspace
const removeMemberFromWorkspace = async (idmember, idhr, idworkspace) => {
  const response = await axiosInstance.put(API_URL + '/removemember/' + idmember + '/' + idworkspace + '/' + idhr);
  return response.data;
};

const workspaceService = {
  getWorkspaces,
  addworkspace,
  getWorkspace,
  deleteworkspace,
  getUsersWorkspace,
  updateWorkspace,
  removeMemberFromWorkspace,
};

export default workspaceService;
