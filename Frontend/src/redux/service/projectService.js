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
  console.log('\n\n----------------------------------------------------');
  console.log('in deleteProject in projectService');
  console.log(projectId);
  console.log(workspaceId);
  console.log(memberId);
  console.log('\n\n----------------------------------------------------');
  const response = await axiosInstance.put(API_URL + 'delete/' + projectId, { workspaceId, memberId });
  return response.data;
};

//restores project
const restoreProject = async (projectId, workspaceId, memberId) => {
  console.log('\n\n----------------------------------------------------');
  console.log('in restoreProject in projectService');
  console.log(projectId);
  console.log(workspaceId);
  console.log(memberId);
  console.log('\n\n----------------------------------------------------');
  const response = await axiosInstance.put(API_URL + 'undelete/' + projectId, { workspaceId, memberId });
  return response.data;
};

const projectService = {
  addProject,
  getWorkspaceProjects,
  getWorkspaceProjectsForEmployees,
  deleteProject,
  restoreProject,
};

export default projectService;
