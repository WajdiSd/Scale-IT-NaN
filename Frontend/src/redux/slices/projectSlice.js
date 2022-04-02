//import VerifyCode from "src/pages/auth/VerifyCode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from '../service/projectService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  projects: [],
  isProjectManager: false,
  isTeamLeader: false,
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
    resetProject: (state) => {
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
      .addCase(addProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const project = action.payload.project;
        project.isProjectManager = true;
        state.projects.push(action.payload.project);
        state.unarchivedProjects.push(action.payload.project);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkspaceProjects.fulfilled, (state, action) => {
        const filteredProjects = action.payload.projects.map((project) => {
          project.assigned_members.forEach((member) => {
            if (member.memberId === action.payload.userId) {
              member.isProjectManager ? (project.isProjectManager = true) : '';
              member.isTeamLeader ? (project.isTeamLeader = true) : '';
            }
          });
          return project;
        });
        state.projects = filteredProjects;
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = filteredProjects.sort((a, b) => a.isDeleted - b.isDeleted);
        state.unarchivedProjects = state.projects.filter((project) => !project.isDeleted);
        state.archivedProjects = state.projects.filter((project) => project.isDeleted);
      })
      .addCase(getWorkspaceProjects.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getWorkspaceProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectsErrorMessage = 'Ooops, there has been a problem finding your Projects';
      })
      .addCase(getWorkspaceProjectsForMembers.fulfilled, (state, action) => {
        const filteredProjects = action.payload.projects.map((project) => {
          project.assigned_members.forEach((member) => {
            if (member.memberId === action.payload.userId) {
              member.isProjectManager ? (project.isProjectManager = true) : '';
              member.isTeamLeader ? (project.isTeamLeader = true) : '';
            }
          });
          return project;
        });
        state.projects = filteredProjects;
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = filteredProjects.sort((a, b) => {
          const endDateJsA = new Date(a.expectedEndDate);
          const endDateJsB = new Date(b.expectedEndDate);
          return endDateJsB - endDateJsA;
        });
        state.unarchivedProjects = state.projects.filter((project) => !project.isDeleted);
        state.archivedProjects = state.projects.filter((project) => project.isDeleted);
      })
      .addCase(getWorkspaceProjectsForMembers.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getWorkspaceProjectsForMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectsErrorMessage = 'Ooops, there has been a problem finding your Projects';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projectsSuccessMessage = 'The project has been deleted successfully';
        state.projects = state.projects
          .map((project) => {
            if (project._id === action.payload) {
              project.isDeleted = true;
              return project;
            }
            return project;
          })
          .sort((a, b) => a.isDeleted - b.isDeleted);
        state.unarchivedProjects = state.projects.filter((project) => !project.isDeleted);
        state.archivedProjects = state.projects.filter((project) => project.isDeleted);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.projectsErrorMessage = action.payload;
      })
      .addCase(restoreProject.fulfilled, (state, action) => {
        state.projectsSuccessMessage = 'The project has been restored successfully';
        state.projects = state.projects
          .map((project) => {
            if (project._id === action.payload) {
              project.isDeleted = false;
              return project;
            }
            return project;
          })
          .sort((a, b) => a.isDeleted - b.isDeleted);
        state.unarchivedProjects = state.projects.filter((project) => !project.isDeleted);
        state.archivedProjects = state.projects.filter((project) => project.isDeleted);
      })
      .addCase(restoreProject.rejected, (state, action) => {
        state.projectsErrorMessage = action.payload;
      })
      .addCase(resetProjectList.fulfilled, (state, action) => {
        state.projects = [];
        state.archivedProjects = [];
        state.unarchivedProjects = [];
      })
      .addCase(resetProjectList.rejected, (state, action) => {
        state.projects = [];
        state.archivedProjects = [];
        state.unarchivedProjects = [];
        state.projectsErrorMessage = action.payload;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.project = action.payload.data;
        //state.usersInProject = action.payload.data.assigned_users;
        state.isProjectManager = action.payload.isProjectManager;
        state.isTeamLeader = action.payload.isTeamLeader;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.projectsErrorMessage = 'Ooops, there has been a problem finding your Project';
      })
      .addCase(getProject.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getFullMemberByProject.fulfilled, (state, action) => {
        state.usersInProject = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getFullMemberByProject.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getFullMemberByProject.rejected, (state, action) => {
        state.projectsErrorMessage = 'Ooops, there have been a problem finding your Members By Project';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.project = action.payload.project;
      })
      .addCase(removeMembersFromProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(removeMembersFromProject.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(removeMembersFromProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(updateTeamLeader.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateTeamLeader.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateTeamLeader.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(abortproject.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(abortproject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(abortproject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload;
      })
      .addCase(finishproject.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(finishproject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(finishproject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload;
      })
      .addCase(inviteMemberToProject.fulfilled, (state, action) => {
        console.log('inviteMemberToProject fulfilled');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(inviteMemberToProject.pending, (state, action) => {
        console.log('inviteMemberToProject pending');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(inviteMemberToProject.rejected, (state, action) => {
        console.log('inviteMemberToProject rejected');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(assignProjectManager.rejected, (state, action) => {
        console.log('inviteMemberToProject rejected');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(assignProjectManager.pending, (state, action) => {
        console.log('assignProjectManager rejected');
        console.log(action);
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(assignProjectManager.fulfilled, (state, action) => {
        console.log('assignProjectManager rejected');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      ;
  },
});

// Resets project list
export const resetProjectList = createAsyncThunk('project/resetProjectList', async (_, thunkAPI) => {
  try {
    await thunkAPI.dispatch(resetProject()).then(() => {
      return true;
    });
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
    return await projectService.deleteProject(data.projectId, data.workspaceId, data.memberId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Members From Project
export const removeMembersFromProject = createAsyncThunk('project/removeMembersFromProject', async (data, thunkAPI) => {
  try {
    const project = await projectService.removeMembersFromProject(data.idproject, data.idtl, data.userIds);
    if (project) {
      await thunkAPI.dispatch(getFullMemberByProject(data.idproject));
      return project;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// restore project
export const restoreProject = createAsyncThunk('project/restoreProject', async (data, thunkAPI) => {
  try {
    return await projectService.restoreProject(data.projectId, data.workspaceId, data.memberId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update project
export const updateProject = createAsyncThunk('project/updateProject', async (data, thunkAPI) => {
  try {
    return await projectService.updateProject(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// updateTeamLeader
export const updateTeamLeader = createAsyncThunk('project/updateTeamLeader', async (data, thunkAPI) => {
  try {
    const project = await projectService.updateTeamLeader(data);
    if (project) {
      await thunkAPI.dispatch(getFullMemberByProject(data.idproject));
      return project;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch projects in workspace for HR and ProjectManagers
export const getWorkspaceProjects = createAsyncThunk('project/getWorkspaceProjects', async (idWorkspace, thunkAPI) => {
  try {
    const listProjects = await projectService.getWorkspaceProjects(idWorkspace);
    const idOfUser = await thunkAPI.getState().auth.user._id;
    const data = {
      projects: listProjects.data,
      userId: idOfUser,
    };

    return data;
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
      const listProjects = await projectService.getWorkspaceProjectsForEmployees(data.idWorkspace, data.idMember);
      const memberData = {
        projects: listProjects.data,
        userId: data.idMember,
      };

      return memberData;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProject = createAsyncThunk('project/getProject', async (objet, thunkAPI) => {
  try {
    const project = await projectService.getProject(objet.idProject, objet.idUser);
    if (project) {
      await thunkAPI.dispatch(getFullMemberByProject(objet.idProject));
      return project;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const abortproject = createAsyncThunk('project/abortproject', async (objet, thunkAPI) => {
  try {
    return await projectService.abortProject(objet.projectId, objet.pmId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const finishproject = createAsyncThunk('project/finishproject', async (objet, thunkAPI) => {
  try {
    return await projectService.finishProject(objet.projectId, objet.pmId);
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

export const inviteMemberToProject = createAsyncThunk('project/inviteMemberToProject', async (data, thunkAPI) => {
  try {
    const invited = await projectService.inviteMemberToProject(data);
      console.log('getFullMemberByProject');
      console.log(data);
      thunkAPI.dispatch(getFullMemberByProject(invited));
      return invited;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// assignProjectManager
export const assignProjectManager = createAsyncThunk('project/assignProjectManager', async (data, thunkAPI) => {
  try {
    const project = await projectService.assignProjectManager(data);
    if (project) {
      await thunkAPI.dispatch(getFullMemberByProject(data.idproject));
      return project;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const { resetProject, setErrorMessage, resetErrorMessage, resetSuccessMessage } = projectSlice.actions;
export default projectSlice.reducer;
