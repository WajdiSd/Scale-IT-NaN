//import VerifyCode from "src/pages/auth/VerifyCode";
import workspaceService from '../service/workspaceService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isHr, isProjectManager } from './authSlice';
import { resetProjectList } from './projectSlice';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  workspaces: [],
  workspace: null,
  usersInWorkspace: [],
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
        state.workspaces = []
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
        state.workspaces = state.workspaces.filter((workspace) => workspace._id !== action.payload._id);
      
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        console.log('delete workspace rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkspaceId.fulfilled, (state, action) => {
        console.log('\n\n--------------------------------------------');
        console.log('getWorkspace id FULFILLED ');
        console.log(action.payload);
        console.log('\n\n--------------------------------------------');
      })
      .addCase(getWorkspaceId.rejected, (state, action) => {
        console.log('\n\n--------------------------------------------');
        console.log('getWorkspace id REJECTED ');
        console.log(action.payload);
        console.log('\n\n--------------------------------------------');
      })
      .addCase(usersbyworkspace.pending, (state) => {
        console.log('users by workspace pending');
        state.isLoading = true;
      })
      .addCase(usersbyworkspace.fulfilled, (state, action) => {
        console.log('users by workspace fulfilled');
        state.isLoading = false;
        state.isSuccess = true;
        state.usersInWorkspace = action.payload;
      })
      .addCase(usersbyworkspace.rejected, (state, action) => {
        console.log('users by workspace rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removememberfromworkspace.pending, (state) => {
        console.log('remove member from workspace pending');
        state.isLoading = true;
      })
      .addCase(removememberfromworkspace.fulfilled, (state, action) => {
        console.log('remove member from workspace fulfilled');
        state.isLoading = false;
        state.isSuccess = true;
        state.usersInWorkspace = state.usersInWorkspace.filter((memb) => memb._id !== action.payload.idmember);
      })
      .addCase(removememberfromworkspace.rejected, (state, action) => {
        console.log('remove member from workspace rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateWorkspace.fulfilled, (state, action) => {
        console.log('update workspace fulfilled');
        state.isLoading = false;
        state.isSuccess = true;
        state.workspace = action.payload;
      })
      .addCase(updateWorkspace.rejected, (state, action) => {
        console.log(state, action);
        console.log('update workspace rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setRatesToMember.fulfilled, (state, action) => {
        console.log('set rates fulfilled');
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(setRatesToMember.rejected, (state, action) => {
        console.log(state, action);
        console.log('set rates rejected');
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
      thunkAPI.dispatch(isHr(workspace));
      thunkAPI.dispatch(isProjectManager(workspace));
      thunkAPI.dispatch(usersbyworkspace(workspace._id));
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

export const { reset } = workspaceSlice.actions;
export default workspaceSlice.reducer;
