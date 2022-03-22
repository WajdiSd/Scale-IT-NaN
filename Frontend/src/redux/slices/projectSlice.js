//import VerifyCode from "src/pages/auth/VerifyCode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from '../service/projectService';
import { isHr, isProjectManager } from './authSlice';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  projects: [],
  project: null,
  usersInProject: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => {
      (state.projects = []), (state.project = null),
      (state.usersInProject = []), (state.isLoading = false),
      (state.isSuccess = false), state.isError = false,
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        console.log('addProject pending');
        state.isLoading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        console.log('addProject fulfilled');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        console.log('addProject rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

// Create new workspace
export const addProject = createAsyncThunk('project/addProject', async (data, thunkAPI) => {
  try {
    return await projectService.addProject(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
