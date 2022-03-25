import authService from '../service/authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import workspaceService from '../service/workspaceService';

const initialState = {
  users: [],
  userErrorMessage: '',
  userSuccessMessage: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Check if member email exists then add him
export const addMember = createAsyncThunk('workspace/addMember', async (email, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const id = state.workspaces.workspace._id;

    const exists = await authService.checkIfUserExistsByEmail(email);
    const existsInWorkspace = await workspaceService.checkIfUserExistsInWorkspace(id, email);

    const user = {
      exists,
      existsInWorkspace,
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
    const state = thunkAPI.getState();
    const id = state.workspaces.workspace._id;

    const exists = await authService.checkIfUserExistsByEmail(email);
    const existsInWorkspace = await workspaceService.checkIfUserExistsInWorkspace(id, email);
    const user = {
      exists,
      existsInWorkspace,
      email,
    };
    return user;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Submit invitations to users
export const submitInvitations = createAsyncThunk('workspace/submitInvitations', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const id = state.workspaces.workspace._id;
    const users = state.workspaceInvite.users;
    if (!users) {
      setUserError('No Valid Users Passed!');
      return 'No Valid Users Passed';
    }
    const managersFiltered = users.filter((user) => {
      if (user.isManager) return user.email;
    });
    const managerEmails = managersFiltered.map((user) => user.email);
    const membersFiltered = users.filter((user) => {
      if (!user.isManager) return user.email;
    });
    const memberEmails = membersFiltered.map((user) => user.email);
    const managers = {
      info: {
        emails: managerEmails,
        role: 'manager',
      },
      id,
    };
    const members = {
      info: {
        emails: memberEmails,
        role: 'member',
      },
      id,
    };
    const managerSubmit = managers.info.emails.length > 0 ? await workspaceService.inviteManagers(managers) : null;
    const memberSubmit = members.info.emails.length > 0 ? await workspaceService.inviteMembers(members) : null;
    thunkAPI.dispatch(resetWorkspaceInvite());

    return [managerSubmit, memberSubmit];
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
    resetWorkspaceInvite: (state, action) => {
      state.users = [];
    },
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
    resetUserSuccess: (state, action) => {
      state.userSuccessMessage = '';
    },
    setUserSuccess: (state, action) => {
      state.userSuccessMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMember.fulfilled, (state, action) => {
        // console.log('action payload in add member fulfilled');
        // console.log(action.payload);
        if (action.payload.exists) {
          const member = {
            email: action.payload.email,
            isManager: false,
          };

          // console.log("I'm in add Member, users:");
          // console.log(state);
          // console.log(state.users);

          state.userSuccessMessage = `Member ${member.email} Added`;

          state.users = [...state.users, member];
        }
      })
      .addCase(addMember.rejected, (state, action) => {
        // console.log('action payload in add member rejected');
        // console.log(action.payload);
        state.userErrorMessage = action.payload;
      })
      .addCase(addManager.fulfilled, (state, action) => {
        // console.log('action payload in add manager fulfilled');
        // console.log(action.payload);
        if (action.payload.exists) {
          const manager = {
            email: action.payload.email,
            isManager: true,
          };

          // console.log("I'm in add Manager, users:");
          // console.log(state);
          // console.log(state.users);

          state.userSuccessMessage = `Member ${manager.email} Added`;

          state.users = [...state.users, manager];
        }
      })
      .addCase(addManager.rejected, (state, action) => {
        // console.log('action payload in add manager rejected');
        // console.log(action.payload);
        state.userErrorMessage = action.payload;
      })
      .addCase(submitInvitations.fulfilled, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('action payload in submit Invitations fulfilled');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');

        state.userSuccessMessage = `Users have been Invited succesfully`;
      })
      .addCase(submitInvitations.rejected, (state, action) => {
        // console.log('\n\n----------------------------------------------------');
        // console.log('action payload in submit Invitations rejected');
        // console.log(action.payload);
        // console.log('\n\n----------------------------------------------------');

        state.userSuccessMessage = `Oops, an error has occured while submitting invitations`;
      });
  },
});

export const { removeUser, setUserError, resetUserError, resetUserSuccess, setUserSuccess, resetWorkspaceInvite } =
  workspaceInviteSlice.actions;
export default workspaceInviteSlice.reducer;
