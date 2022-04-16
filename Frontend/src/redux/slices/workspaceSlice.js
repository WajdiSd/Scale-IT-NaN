//import VerifyCode from "src/pages/auth/VerifyCode";
import workspaceService from '../service/workspaceService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isHr, isProjectManager } from './authSlice';
import { resetProjectList } from './projectSlice';

const initialState = {
  workspaces: [],
  workspace: null,
  usersInWorkspace: [],
  leaderboardWorkspace: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    resetWorkspace: (state) => {
      (state.workspaces = []),
        (state.workspace = null),
        (leaderboardWorkspace = [])((state.usersInWorkspace = [])),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = '');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkspace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.workspace = action.payload;
      })
      .addCase(getWorkspace.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.workspace = null;
      })
      .addCase(getWorkspaces.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.workspaces = [];
      })
      .addCase(getWorkspaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.workspaces = action.payload;
        state.workspace = null;
        const workspac = JSON.parse(localStorage.getItem('redux-workspaces'));
        if (workspac != null) {
          workspac.workspace = null;
          localStorage.setItem('redux-workspaces', workspac);
        }
      })
      .addCase(getWorkspaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(addWorkspace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWorkspace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workspaces.push(action.payload);
      })
      .addCase(addWorkspace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkspace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workspaces = state.workspaces.filter((workspace) => workspace._id !== action.payload._id);
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkspaceId.fulfilled, (state, action) => {})
      .addCase(getWorkspaceId.rejected, (state, action) => {})
      .addCase(usersbyworkspace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(usersbyworkspace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.usersInWorkspace = action.payload;
      })
      .addCase(usersbyworkspace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removememberfromworkspace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removememberfromworkspace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.usersInWorkspace = state.usersInWorkspace.filter((memb) => memb._id !== action.payload.idmember);
      })
      .addCase(removememberfromworkspace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateWorkspace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workspace = action.payload;
      })
      .addCase(updateWorkspace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setRatesToMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(setRatesToMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(AssignProjectManagerTomember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(AssignProjectManagerTomember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(dischargeprojectmanager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(dischargeprojectmanager.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(AssignHR.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(AssignHR.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(AssignHR.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getworspaceleaderboard.rejected, (state, action) => {
        console.log('getworspaceleaderboard rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getworspaceleaderboard.pending, (state, action) => {
        console.log('getworspaceleaderboard pending');
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getworspaceleaderboard.fulfilled, (state, action) => {
        console.log('getworspaceleaderboard fulfilled');
        console.log(action);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.leaderboardWorkspace = action.payload.leaderboard;
      });
  },
});

export const getWorkspaceId = createAsyncThunk('workspace/getWorkspaceId', async (_, thunkAPI) => {
  try {
    return await thunkAPI.getState().workspace._id;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getWorkspaces = createAsyncThunk('workspace/getWorkspaces', async (id, thunkAPI) => {
  try {
    thunkAPI.dispatch(resetProjectList());
    return await workspaceService.getWorkspaces(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getWorkspace = createAsyncThunk('workspace/getWorkspace', async (id, thunkAPI) => {
  try {
    const workspace = await workspaceService.getWorkspace(id);
    if (workspace) {
      //await thunkAPI.dispatch(resetProjectList());
      await thunkAPI.dispatch(isHr(workspace));
      await thunkAPI.dispatch(isProjectManager(workspace));
      await thunkAPI.dispatch(usersbyworkspace(workspace._id));
      await thunkAPI.dispatch(getworspaceleaderboard(id));
      return workspace;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new workspace
export const addWorkspace = createAsyncThunk('workspace/addWorkspace', async (workspaceData, thunkAPI) => {
  try {
    return await workspaceService.addworkspace(workspaceData.data, workspaceData.userId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete workspace
export const deleteWorkspace = createAsyncThunk('workspace/deleteWorkspace', async (workspaceData, thunkAPI) => {
  try {
    return await workspaceService.deleteworkspace(workspaceData.idWorkspace, workspaceData.userId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//users by workspace
export const usersbyworkspace = createAsyncThunk('workspace/usersbyworkspace', async (id, thunkAPI) => {
  try {
    return await workspaceService.getUsersWorkspace(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateWorkspace = createAsyncThunk('workspace/updateWorkspace', async (workspaceData, thunkAPI) => {
  try {
    return await workspaceService.updateWorkspace(workspaceData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const setRatesToMember = createAsyncThunk('workspace/setRatesToMember', async (Data, thunkAPI) => {
  try {
    return await workspaceService.setRatestomember(Data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const AssignProjectManagerTomember = createAsyncThunk(
  'workspace/AssignProjectManagerTomember',
  async (Data, thunkAPI) => {
    try {
      return await workspaceService.AssignProjectManagerToMember(Data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dischargeprojectmanager = createAsyncThunk('workspace/dischargeprojectmanager', async (Data, thunkAPI) => {
  try {
    return await workspaceService.DischargeProjectManager(Data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//remove member from workspace
export const removememberfromworkspace = createAsyncThunk(
  'workspace/removememberfromworkspace',
  async (object, thunkAPI) => {
    try {
      return await workspaceService.removeMemberFromWorkspace(object.idmember, object.idhr, object.idworkspace);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userExistsInWorkspace = createAsyncThunk('workspace/userExistsInWorkspace', async (object, thunkAPI) => {
  try {
    return await workspaceService.checkIfUserExistsInWorkspace(object.id, object.invitedMember);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const AssignHR = createAsyncThunk('workspace/AssignHR', async (Data, thunkAPI) => {
  try {
    const res = await workspaceService.AssignHR(Data);
    if (res) {
      await thunkAPI.dispatch(getWorkspace(Data.idworkspace));
      return res;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getworspaceleaderboard = createAsyncThunk(
  'workspace/getworspaceleaderboard',
  async (workspaceid, thunkAPI) => {
    try {
      return await workspaceService.getWorkspaceLeaderboard(workspaceid);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const { resetWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
