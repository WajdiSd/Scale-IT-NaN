import axiosInstance from 'src/utils/axios';

const API_URL = 'project/';

//add project
const addProject = async (data) => {
  const response = await axiosInstance.post(API_URL + 'add/', data);
  return response.data;
};

//get projects from Workspace for Hr and Project Manager
const getWorkspaceProjects = async (idWorkspace) => {
  const response = await axiosInstance.get(API_URL + 'list/' + idWorkspace);
  return response.data;
};

//get projects from Workspace for TeamLeaders and normal Employees
const getWorkspaceProjectsForEmployees = async (idWorkspace, idMember) => {
  const response = await axiosInstance.get(API_URL + 'listbymember/' + idWorkspace + '/' + idMember);
  return response.data;
};

//deletes project
const deleteProject = async (projectId, workspaceId, memberId) => {
  const response = await axiosInstance.put(API_URL + 'delete/' + projectId, { workspaceId, memberId });
  return response.data;
};

//deletes members
const removeMembersFromProject = async (idproject, idtl, userIds) => {
  const response = await axiosInstance.put(API_URL + 'delete-members/' + idproject + '/' + idtl, userIds);
  return response.data;
};

//restores project
const restoreProject = async (projectId, workspaceId, memberId) => {
  const response = await axiosInstance.put(API_URL + 'undelete/' + projectId, { workspaceId, memberId });
  return response.data;
};

//update project
const updateProject = async (data) => {
  const idProject = data.idProject;
  const idPM = data.idPM;
  data.idProject = undefined;
  data.idPM = undefined;
  const response = await axiosInstance.put(API_URL + 'update/' + idProject + '/' + idPM, data);
  return response.data;
};

//updateTeamLeader
const updateTeamLeader = async (data) => {
  const idproject = data.idproject;
  const idpm = data.idpm;
  const idmember = data.idmember;
  const response = await axiosInstance.put(API_URL + 'assignteamleader/' + idproject + '/' + idmember + '/' + idpm);
  return response.data;
};

// get project by id
const getProject = async (idProject, idUser) => {
  const response = await axiosInstance.get(API_URL + 'get/' + idProject + '/' + idUser);
  return response.data;
};

// get members in project
const getFullMemberByProject = async (idProject) => {
  const response = await axiosInstance.get(API_URL + 'list/fullmembers/' + idProject);
  return response.data;
};

const inviteMemberToProject = async (data) => {
  const idproject = data.idproject;
  const idtl = data.idtl;
  data.idproject = undefined;
  data.idtl = undefined;
  const response = await axiosInstance.put(API_URL + 'invite-members/'+idproject+'/'+idtl, data);
  return response.data;
};
const abortProject = async (projectId, pmId) => {
  const response = await axiosInstance.put(API_URL + 'abortproject/' + projectId + '/' + pmId);
  return response.data;
};

const finishProject = async (projectId, pmId) => {
  const response = await axiosInstance.put(API_URL + 'finishproject/' + projectId + '/' + pmId);
  return response.data;
};

//assignProjectManager
const assignProjectManager = async (data) => {
  const idproject = data.idproject;
  const idpm = data.idpm;
  const idmember = data.idmember;
  const response = await axiosInstance.put(API_URL + 'assignProjectManager/' + idproject + '/' + idmember + '/' + idpm);
  return response.data;
};

const projectService = {
  addProject,
  getWorkspaceProjects,
  getWorkspaceProjectsForEmployees,
  deleteProject,
  restoreProject,
  getProject,
  getFullMemberByProject,
  updateProject,
  inviteMemberToProject,
  removeMembersFromProject,
  updateTeamLeader,
  abortProject,
  finishProject,
  assignProjectManager,
};

export default projectService;
