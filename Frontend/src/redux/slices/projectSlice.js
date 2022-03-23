//import VerifyCode from "src/pages/auth/VerifyCode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from '../service/projectService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  projects: [],
  archivedProjects: [],
  unarchivedProjects: [],
  project: null,
  usersInProject: [],
  projectsErrorMessage: '',
  projectsSuccessMessage: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    resetErrorMessage: (state) => {
      state.projectsErrorMessage = '';
    },
    setErrorMessage: (state, action) => {
      state.projectsErrorMessage = action.payload;
    },
    resetSuccessMessage: (state) => {
      state.projectsSuccessMessage = '';
    },
    setSuccessMessage: (state, action) => {
      state.projectsSuccessMessage = action.payload;
    },
    reset: (state) => {
      (state.projects = []),
        (state.project = null),
        (state.usersInProject = []),
        (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = '');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        // console.log('addProject pending');
        state.isLoading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        // console.log('addProject fulfilled');
        // console.log(action);
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload.project);
        state.unarchivedProjects.push(action.payload.project);
      })
      .addCase(addProject.rejected, (state, action) => {
        // console.log('addProject rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkspaceProjects.fulfilled, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('getWorkspaceProjects fulfilled');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');
        state.projects = action.payload.data;
        state.unarchivedProjects = state.projects.filter((project) => !project.isDeleted);
        state.archivedProjects = state.projects.filter((project) => project.isDeleted);
      })
      .addCase(getWorkspaceProjects.rejected, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('getWorkspaceProjects rejected');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');
        state.projectsErrorMessage = 'Ooops, there has been a problem finding your Projects';
      })
      .addCase(getWorkspaceProjectsForMembers.fulfilled, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('getWorkspaceProjectsForMembers fulfilled');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');
        // state.projects = action.payload.data;
        state.unarchivedProjects = state.projects.filter((project) => !project.isDeleted);
        state.archivedProjects = state.projects.filter((project) => project.isDeleted);
        // console.log('\n\n----------------------------------------------------');
        // console.log('getWorkspaceProjectsForMembers fulfilled unarchived projects');
        // console.log(state.unarchivedProjects);
        // console.log('\n\n----------------------------------------------------');
      })
      .addCase(getWorkspaceProjectsForMembers.rejected, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('getWorkspaceProjectsForMembers rejected');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');
        state.projectsErrorMessage = 'Ooops, there has been a problem finding your Projects';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('deleteProject fulfilled');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');
        state.projectsSuccessMessage = action.payload;
        state.unarchivedProjects = state.projects.filter((project) => !project.isDeleted);
        state.archivedProjects = state.projects.filter((project) => project.isDeleted);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('deletProject rejected');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');
        state.projectsErrorMessage = action.payload;
      })
      .addCase(resetProjectList.fulfilled, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('resetProjectList fulfilled');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');
        state.projects = [];
        state.archivedProjects = [];
        state.unarchivedProjects = [];
      })
      .addCase(resetProjectList.rejected, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('resetProjectList rejected');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');
        state.projects = [];
        state.archivedProjects = [];
        state.unarchivedProjects = [];
        state.projectsErrorMessage = action.payload;
      });
  },
});

// Resets project list
export const resetProjectList = createAsyncThunk('project/resetProjectList', async (_, thunkAPI) => {
  try {
    return true;
  } catch (error) {
    const message = 'Problem resetting projects';
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new project
export const addProject = createAsyncThunk('project/addProject', async (data, thunkAPI) => {
  try {
    return await projectService.addProject(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete project
export const deleteProject = createAsyncThunk('project/deleteProject', async (data, thunkAPI) => {
  try {
    // console.log('\n\n----------------------------------------------------');
    // console.log('in deleteProject in projectSlice');
    // console.log(data);
    // console.log('\n\n----------------------------------------------------');
    return await projectService.deleteProject(data.projectId, data.workspaceId, data.memberId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch projects in workspace for HR and ProjectManagers
export const getWorkspaceProjects = createAsyncThunk('project/getWorkspaceProjects', async (idWorkspace, thunkAPI) => {
  try {
    return await projectService.getWorkspaceProjects(idWorkspace);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch projects in workspace for Members and TeamLeaders
export const getWorkspaceProjectsForMembers = createAsyncThunk(
  'project/getWorkspaceProjectsForMembers',
  async (data, thunkAPI) => {
    try {
      return await projectService.getWorkspaceProjectsForEmployees(data.idWorkspace, data.idMember);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset, setErrorMessage, resetErrorMessage } = projectSlice.actions;
export default projectSlice.reducer;
