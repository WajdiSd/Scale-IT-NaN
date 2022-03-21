//import VerifyCode from "src/pages/auth/VerifyCode";
import workspaceService from '../service/workspaceService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isHr, isProjectManager } from './authSlice';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  workspaces: [],
  workspace: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    reset: (state) => {
      (state.workspaces = []), (state.isLoading = false);
      (state.workspace = null), (state.isSuccess = false);
      state.isError = false;
      state.message = '';
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
      })
      .addCase(getWorkspaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.workspaces = action.payload;
        state.workspace = null;
      })
      .addCase(getWorkspaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(addWorkspace.pending, (state) => {
        console.log('add workspace pending');
        state.isLoading = true;
      })
      .addCase(addWorkspace.fulfilled, (state, action) => {
        console.log('add workspace fulfilled');
        state.isLoading = false;
        state.isSuccess = true;
        state.workspaces.push(action.payload);
      })
      .addCase(addWorkspace.rejected, (state, action) => {
        console.log('add workspace rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkspace.pending, (state) => {
        console.log('delete workspace pending');
        state.isLoading = true;
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        console.log('delete workspace fulfilled');
        state.isLoading = false;
        state.isSuccess = true;
        state.workspaces = state.workspaces.filter((workspace) => workspace._id !== action.payload.id);
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        console.log('delete workspace rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getWorkspaces = createAsyncThunk('workspace/getWorkspaces', async (id, thunkAPI) => {
  try {
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
      thunkAPI.dispatch(isHr(workspace));
      thunkAPI.dispatch(isProjectManager(workspace));
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
    return await workspaceService.addworkspace(workspaceData, user._id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete workspace
export const deleteWorkspace = createAsyncThunk('workspace/deleteWorkspace', async (idworkspace, thunkAPI) => {
  try {
    return await workspaceService.deleteworkspace(idworkspace, user._id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const { reset } = workspaceSlice.actions;
export default workspaceSlice.reducer;
