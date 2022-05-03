import axiosInstance from 'src/utils/axios';

const API_URL = 'performance/';

const getScoreByWorkspace = async (memberId, workspaceId) => {
  const response = await axiosInstance.get(API_URL + 'scorebyworkspace/' + memberId + '/' + workspaceId);
  return response.data;
};

const getRankByWorkspace = async (memberId, workspaceId) => {
  const response = await axiosInstance.get(API_URL + 'getrankworkspaceleaderboard/' + workspaceId + '/' + memberId);
  return response.data;
};

const getFinishedProjectsInTimePourcentage = async (workspaceId) => {
  const response = await axiosInstance.get(API_URL + 'finished-projects-in-time-pourcentage/' + workspaceId);
  return response.data;
};

const getFinishedProjectsLatePourcentage = async (workspaceId) => {
  const response = await axiosInstance.get(API_URL + 'finished-projects-late-pourcentage/' + workspaceId);
  return response.data;
};

const getFinishedTasksInTimePourcentage = async (idproj, idmember) => {
  const response = await axiosInstance.get(API_URL + 'tasksintime/' + idproj + '/' + idmember);
  return response.data;
};

const getFinishedTasksLatePourcentage = async (idproj, idmember) => {
  const response = await axiosInstance.get(API_URL + 'latetasks/' + idproj + '/' + idmember);
  return response.data;
};

const getAllTasksInTimePercentage = async (idproj) => {
  const response = await axiosInstance.get(API_URL + 'alltasksintime/' + idproj);
  return response.data;
};

const getAllLateTasksPercentage = async (idproj) => {
  const response = await axiosInstance.get(API_URL + 'alllatetasks/' + idproj);
  return response.data;
};

const getprojectprogress = async (idproj) => {
  const response = await axiosInstance.get(API_URL + 'projectprogress/' + idproj);
  return response.data;
};

const performanceService = {
  getScoreByWorkspace,
  getRankByWorkspace,
  getFinishedProjectsInTimePourcentage,
  getFinishedProjectsLatePourcentage,
  getFinishedTasksInTimePourcentage,
  getFinishedTasksLatePourcentage,
  getAllTasksInTimePercentage,
  getAllLateTasksPercentage,
  getprojectprogress,
};

export default performanceService;
