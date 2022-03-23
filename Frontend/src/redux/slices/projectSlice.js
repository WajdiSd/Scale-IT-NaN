//import VerifyCode from "src/pages/auth/VerifyCode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from '../service/projectService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  projects: [],
  project: null,
  usersInProject: [],
  projectsErrorMessage: '',
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
      .addCase(getWorkspaceProjects.fulfilled, (state, action) => {
        state.projects = action.payload.data;
      })
      .addCase(getWorkspaceProjects.rejected, (state, action) => {
        
        state.projectsErrorMessage = 'Ooops, there have been a problem finding your Projects';
      })
      .addCase(getWorkspaceProjectsForMembers.fulfilled, (state, action) => {
        state.projects = action.payload.data;
      })
      .addCase(getWorkspaceProjectsForMembers.rejected, (state, action) => {
        state.projectsErrorMessage = 'Ooops, there have been a problem finding your Projects';
      })
      .addCase(getProject.fulfilled, (state, action) => {
        console.log('\n\n----------------------------------------------------');
        console.log('getProject fulfilled');
        console.log(action.payload);
        console.log('\n\n----------------------------------------------------');
        state.project = action.payload.data;
        state.usersInProject = action.payload.assigned_users;
      })
      .addCase(getProject.rejected, (state, action) => {
        console.log('\n\n----------------------------------------------------');
        console.log('getProject rejected');
        console.log(action.payload);
        console.log('\n\n----------------------------------------------------');
        state.projectsErrorMessage = 'Ooops, there have been a problem finding your Project';
      })
      .addCase(getFullMemberByProject.fulfilled, (state, action) => {
        console.log('\n\n----------------------------------------------------');
        console.log('getFullMemberByProject fulfilled');
        console.log(action.payload);
        console.log('\n\n----------------------------------------------------');
        state.usersInProject = action.payload.data;
      })
      .addCase(getFullMemberByProject.rejected, (state, action) => {
        console.log('\n\n----------------------------------------------------');
        console.log('getFullMemberByProject rejected');
        console.log(action.payload);
        console.log('\n\n----------------------------------------------------');
        state.projectsErrorMessage = 'Ooops, there have been a problem finding your Members By Project';
      });
  },
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
      return await projectService.getWorkspaceProjectsForMembers(data.idWorkspace, data.idMember);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProject = createAsyncThunk('project/getProject', async (idProject, thunkAPI) => {
  try {
    const project = await projectService.getProject(idProject);
    if (project) {
      thunkAPI.dispatch(getFullMemberByProject(idProject));
      return project;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getFullMemberByProject = createAsyncThunk('project/fullmembers', async (idProject, thunkAPI) => {
  try {
    return await projectService.getFullMemberByProject(idProject);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const { reset, setErrorMessage, resetErrorMessage } = projectSlice.actions;
export default projectSlice.reducer;
