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
  const response = await axiosInstance.put(API_URL + 'delete-members/' + idproject+'/'+idtl, userIds);
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

// get project by id
const getProject = async (idProject,idUser) => {
  const response = await axiosInstance.get(API_URL + 'get/' + idProject+'/'+idUser);
  return response.data;
};

// get members in project
const getFullMemberByProject = async (idProject) => {
  const response = await axiosInstance.get(API_URL + 'list/fullmembers/' + idProject);
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
  removeMembersFromProject,
};

export default projectService;
