import axios from 'axios';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import { dispatch } from '../store';

const API_URL = 'workspace/';
const LEADER_URL = 'performance/';
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

const updateWorkspace = async (workspaceData) => {
  const idworkspace = workspaceData.idworkspace;
  const idHR = workspaceData.idHR;
  workspaceData.idHR = undefined;
  workspaceData.idworkspace = undefined;
  const response = await axiosInstance.put(API_URL + '/update/' + idworkspace + '/' + idHR, workspaceData);
  return response.data;
};

const setRatestomember = async (Data) => {
  const idworkspace = Data.idworkspace;
  const idHR = Data.idHR;
  const idmember = Data.idmember;
  Data.idHR = undefined;
  Data.idworkspace = undefined;
  Data.idmember = undefined;
  const response = await axiosInstance.put(
    API_URL + '/asignratestomember/' + idworkspace + '/' + idHR + '/' + idmember,
    Data
  );
  return response.data;
};
//remove member from workspace
const removeMemberFromWorkspace = async (idmember, idhr, idworkspace) => {
  const response = await axiosInstance.put(API_URL + '/removemember/' + idmember + '/' + idworkspace + '/' + idhr);
  return response.data;
};

// send invites to members
const inviteMembers = async (members) => {
  const response = await axiosInstance.put(API_URL + 'invite-members/' + members.id, members.info);
  return response.data;
};

// send invites to managers
const inviteManagers = async (managers) => {
  const response = await axiosInstance.put(API_URL + 'invite-members/' + managers.id, managers.info);
  return response.data;
};

// check if user exists in workspace
const checkIfUserExistsInWorkspace = async (workspaceId, email) => {
  const response = await axiosInstance.get(API_URL + workspaceId + '/' + email);
  return response.data;
};

const AssignProjectManagerToMember = async (Data) => {
  const idworkspace = Data.idworkspace;
  const idHR = Data.idHR;
  const idmember = Data.idmember;
  const response = await axiosInstance.put(API_URL + 'assignPM/' + idworkspace + '/' + idmember + '/' + idHR);
  return response.data;
};

const DischargeProjectManager = async (Data) => {
  const idworkspace = Data.idworkspace;
  const idHR = Data.idHR;
  const idmember = Data.idmember;
  const response = await axiosInstance.put(API_URL + 'deletePM/' + idworkspace + '/' + idmember + '/' + idHR);
  return response.data;
};

const AssignHR = async (Data) => {
  const idworkspace = Data.idworkspace;
  const idHR = Data.idHR;
  const idmember = Data.idmember;
  const response = await axiosInstance.put(API_URL + 'assignHR/' + idworkspace + '/' + idmember + '/' + idHR);
  return response.data;
};

const getWorkspaceLeaderboard = async (workspaceId) => {
  const response = await axiosInstance.get(LEADER_URL + 'leaderboard-workspace/' + workspaceId);
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
  getUsersWorkspace,
  updateWorkspace,
  removeMemberFromWorkspace,
  setRatestomember,
  AssignProjectManagerToMember,
  DischargeProjectManager,
  AssignHR,
  getWorkspaceLeaderboard,
};

export default workspaceService;
