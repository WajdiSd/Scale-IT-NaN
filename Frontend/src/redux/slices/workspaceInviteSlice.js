//import VerifyCode from "src/pages/auth/VerifyCode";
import workspaceService from '../service/workspaceService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const addMember = createAction('addMember');
const addManager = createAction('addManager');
const removeUser = createAction('removeUser');

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Check if user exists
export const checkIfUserExists = createAsyncThunk('workspace/checkIfUserExists', async (email, thunkAPI) => {
  try {
    return await authService.verifyUser(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const workspaceInviteSlice = createSlice({
  name: 'workspaceInvite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMember, (state, action) => {
        if (!action.payload.email) {
          return;
        }
        const member = {
          email: action.payload.email,
          isManager: false,
        };

        state.users = [...users, member];
      })
      .addCase(addManager, (state, action) => {
        if (!action.payload.email) {
          return;
        }
        const manager = {
          email: action.payload.email,
          isManager: true,
        };
        state.users = [...users, manager];
      })
      .addCase(removeUser, (state, action) => {
        state.users = users.filter((user) => user.email !== action.payload);
      })
      .addCase(pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.workspaces = action.payload;
      })
      .addCase(rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const getWorkspaceMembers = createAsyncThunk('workspace/members', async (id, thunkAPI) => {
  try {
    return await workspaceService.getWorkspaces(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const { reset } = workspaceInviteSlice.actions;
export default workspaceInviteSlice.reducer;
