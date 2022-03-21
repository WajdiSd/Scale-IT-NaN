import authService from '../service/authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import workspaceService from '../service/workspaceService';

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
    console.log('\n\n----------------------------------------------------');
    console.log('users state in submit invitations');
    console.log(users);
    console.log('id state in submit invitations');
    console.log(id);

    console.log('\n\n----------------------------------------------------');
    if (!users) {
      setUserError('No Valid Users Passed!');
      return 'not working';
    }
    const managerEmails = users.map((user) => {
      if (user.isManager) return user.email;
    });
    console.log('\n\n----------------------------------------------------');
    console.log('manager Emails');
    console.log(managerEmails);
    console.log('\n\n----------------------------------------------------');
    const memberEmails = users.map((user) => {
      if (!user.isManager) return user.email;
    });
    console.log('\n\n----------------------------------------------------');
    console.log('member Emails');
    console.log(memberEmails);
    console.log('\n\n----------------------------------------------------');

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

    console.log('\n\n----------------------------------------------------');
    console.log('Managers before await');
    console.log(managers);
    console.log('Members before await');
    console.log(members);
    console.log('\n\n----------------------------------------------------');

    const managerSubmit = managers.info.emails[0] ? await workspaceService.inviteManagers(managers) : null;
    const memberSubmit = members.info.emails[0] ? await workspaceService.inviteMembers(members) : null;
    console.log('\n\n----------------------------------------------------');
    console.log('Manager Submit before return');
    console.log(managerSubmit);
    console.log('Member Submit before return');
    console.log(memberSubmit);
    console.log('\n\n----------------------------------------------------');
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
      })
      .addCase(submitInvitations.fulfilled, (state, action) => {
        console.log('\n\n----------------------------------------------------');
        console.log('action payload in submit Invitations fulfilled');
        console.log(action.payload);
        console.log('\n\n----------------------------------------------------');
      })
      .addCase(submitInvitations.rejected, (state, action) => {
        console.log('\n\n----------------------------------------------------');
        console.log('action payload in submit Invitations rejected');
        console.log(action.payload);
        console.log('\n\n----------------------------------------------------');
      });
  },
});

export const { removeUser, setUserError, resetUserError } = workspaceInviteSlice.actions;
export default workspaceInviteSlice.reducer;
