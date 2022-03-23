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
  console.log(idWorkspace, idMember);
  const response = await axiosInstance.get(API_URL + 'listbymember/' + idWorkspace + '/' + idMember);
  return response.data;
};

const getProject = async (idProject) => {
  const response = await axiosInstance.get(API_URL + 'get/' + idProject);
  return response.data;
}

const projectService = {
  addProject,
  getWorkspaceProjects,
  getWorkspaceProjectsForEmployees,
  getProject,
};

export default projectService;
