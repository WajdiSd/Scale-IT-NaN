//import VerifyCode from "src/pages/auth/VerifyCode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../service/taskService';


const initialState = {
  tasks: [],
  tasks_to_do: [],
  tasks_doing: [],
  tasks_done: [],
  tasks_review: [],
  
  isProjectManager: false,
  isTeamLeader: false,

  task: null,
  usersInTask: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetTask: (state) => {
      (state.projects = []),
        (state.isProjectManager = false),
        (state.isTeamLeader = false),
        (state.archivedProjects = []),
        (state.unarchivedProjects = []),
        (state.project = null),
        (state.usersInProject = []),
        (state.projectsErrorMessage = ''),
        (state.projectsSuccessMessage = ''),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = '');
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(addTask.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(addTask.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    })
    .addCase(addTask.rejected, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    })
    ;
  },
});


// Create new project
export const addTask = createAsyncThunk('task/addTask', async (data, thunkAPI) => {
  try {
    return await taskService.addTask(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch projects in workspace for HR and ProjectManagers
export const getTasksByProject = createAsyncThunk('task/getTasksByProject', async (idWorkspace, thunkAPI) => {
  try {
    const listProjects = await taskService.getTasksByProject(idWorkspace);
    
    return listProjects;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const { resetTask } = tasksSlice.actions;
export default tasksSlice.reducer;