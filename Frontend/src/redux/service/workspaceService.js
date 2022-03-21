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

// send invites to members
const inviteMembers = async (members) => {
  const response = await axiosInstance.put(API_URL + 'invite-members/' + members.id, members.info);

  console.log('inviteMembers()');
  console.log(response);
  console.log(response.data);

  return response.data;
};

// send invites to managers
const inviteManagers = async (managers) => {
  const response = await axiosInstance.put(API_URL + 'invite-members/' + managers.id, managers.info);

  console.log('inviteManagers()');
  console.log(response);
  console.log(response.data);

  return response.data;
};

// check if user exists in workspace
const checkIfUserExistsInWorkspace = async (workspaceId, email) => {
  console.log('\n\n-----------------------------------------------------------------------');
  console.log("I'm in checkIfUserExistsInWorkspace: workspaceId");
  console.log(workspaceId);
  console.log('\n\n-----------------------------------------------------------------------');

  const response = await axiosInstance.get(API_URL + workspaceId + '/' + email);
  console.log('\n\n-----------------------------------------------------------------------');
  console.log("I'm in checkIfUserExistsInWorkspace: response.data");
  console.log(response.data);
  console.log('\n\n-----------------------------------------------------------------------');
  return response.data;
};

const workspaceService = {
  getWorkspaces,
  addworkspace,
  getWorkspace,
  deleteworkspace,
  inviteMembers,
  inviteManagers,
  checkIfUserExistsInWorkspace,
};

export default workspaceService;
