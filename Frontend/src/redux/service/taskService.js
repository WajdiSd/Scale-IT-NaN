import axiosInstance from 'src/utils/axios';

const API_URL = 'task/';

//add task
const addTask = async (data) => {
  const response = await axiosInstance.post(API_URL + 'add/', data);
  return response.data;
};

const getUserTasks = async (object) => {
  const response = await axiosInstance.get(
    API_URL + 'getUserTasks/' + object.projectId + '/' + object.memberId + '/' + object.isExecutive
  );
  return response.data;
};

const getBoard = async (projectid) => {
  const response = await axiosInstance.get(API_URL + 'tasksbyproject/' + projectid);
  return response.data;
};

//update tasks state
const updateTaskStatus = async (data) => {
  const response = await axiosInstance.put(API_URL + 'updatestate/' + data.taskid, data);
  return response.data;
};

const removeMemberFromTask = async (data) => {
  console.log(data);
  const response = await axiosInstance.put(
    API_URL + 'remove-members/' + data.projectId + '/' + data.idtask + '/' + data.idtl,
    data
  );
  return response.data;
};

//update task
const updateTask = async (data) => {
  const idproject = data.projectId;
  const idmember = data.idmember;
  const idtask = data.idTask;
  const response = await axiosInstance.put(API_URL + 'update/'+ idtask + '/' + idproject + '/' + idmember,data);
  return response.data;
};

const taskService = {
  addTask,
  getUserTasks,
  updateTaskStatus,
  getBoard,
  updateTask,
  removeMemberFromTask,
};

export default taskService;
