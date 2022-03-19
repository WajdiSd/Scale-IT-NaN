import authService from '../service/authService';
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  userErrorMessage: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Check if member email exists then add him
export const addMember = createAsyncThunk('workspace/addMember', async (email, thunkAPI) => {
  try {
    const exists = await authService.checkIfUserExistsByEmail(email);
    const user = {
      exists,
      email,
    };
    return user;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Check if manager email exists then add him
export const addManager = createAsyncThunk('workspace/addManager', async (email, thunkAPI) => {
  try {
    const exists = await authService.checkIfUserExistsByEmail(email);
    const user = {
      exists,
      email,
    };
    return user;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const workspaceInviteSlice = createSlice({
  name: 'workspaceInvite',
  initialState,
  reducers: {
    removeUser: (state, action) => {
      console.log(action.payload);
      state.users = state.users.filter((user) => user.email !== action.payload);
    },
    resetUserError: (state, action) => {
      state.userErrorMessage = '';
    },
    setUserError: (state, action) => {
      state.userErrorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMember.fulfilled, (state, action) => {
        console.log('action payload in add member fulfilled');
        console.log(action.payload);
        if (action.payload.exists) {
          const member = {
            email: action.payload.email,
            isManager: false,
          };

          console.log("I'm in add Member, users:");
          console.log(state);
          console.log(state.users);

          state.users = [...state.users, member];
        }
      })
      .addCase(addMember.rejected, (state, action) => {
        console.log('action payload in add member rejected');
        console.log(action.payload);
        state.userErrorMessage = action.payload;
      })
      .addCase(addManager.fulfilled, (state, action) => {
        console.log('action payload in add manager fulfilled');
        console.log(action.payload);
        if (action.payload.exists) {
          const manager = {
            email: action.payload.email,
            isManager: true,
          };

          console.log("I'm in add Manager, users:");
          console.log(state);
          console.log(state.users);

          state.users = [...state.users, manager];
        }
      })
      .addCase(addManager.rejected, (state, action) => {
        console.log('action payload in add manager rejected');
        console.log(action.payload);
        state.userErrorMessage = action.payload;
      });
  },
});

export const { removeUser, setUserError, resetUserError } = workspaceInviteSlice.actions;
export default workspaceInviteSlice.reducer;
