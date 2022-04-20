import authService from '../service/authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import workspaceService from '../service/workspaceService';
import projectService from '../service/projectService';
import taskService from '../service/taskService';

const initialState = {
  users: [],
  taskMembers: [],
  notAssignedMembers: [],
  userErrorMessage: '',
  userSuccessMessage: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Check if member email exists in workspace then add him
export const addMemberToTask = createAsyncThunk('task/addMemberToTask', async (email, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const id = state.projects.project._id;

    const exists = await authService.checkIfUserExistsByEmail(email);
    const existsInProject = await projectService.checkIfUserExistsInProject(id, email);

    const user = {
      exists,
      existsInProject,
      email,
    };
    return user;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch task members
export const getTaskMembers = createAsyncThunk('task/getTaskMembers', async (idTask, thunkAPI) => {
  try {
    const assignedMembers = await taskService.getTaskMembers(idTask);
    const state = thunkAPI.getState();
    const usersInProject = state.projects.usersInProject;
    const notAssignedMembers = usersInProject.filter((user) => {
      let exists = false;
      assignedMembers &&
        assignedMembers.forEach((member) => {
          if (user._id === member._id) exists = true;
        });

      return !exists;
    });
    // notAssignedMembers : are not assigned to task
    // assignedMembers : are assigned to task
    return [notAssignedMembers, assignedMembers];
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Submit invitations to users
export const submitInvitationsToTask = createAsyncThunk('task/submitInvitationsToTask', async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const users = state.invite.users;

    if (!users) {
      setUserError('No Valid Users Passed!');
      return 'No Valid Users Passed';
    }

    const memberEmails = users.map((user) => user.email);

    const members = {
      emails: memberEmails,
      id,
    };

    const memberSubmit = members.emails.length > 0 ? await taskService.assignMembers(members) : null;
    thunkAPI.dispatch(resetInvite());

    return memberSubmit;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

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
    const users = state.invite.users;

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
    thunkAPI.dispatch(resetInvite());

    return [managerSubmit, memberSubmit];
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    resetInvite: (state, action) => {
      state.users = [];
    },
    removeUser: (state, action) => {
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
        if (action.payload.exists) {
          const member = {
            email: action.payload.email,
            isManager: false,
          };

          state.userSuccessMessage = `Member ${member.email} Added`;

          state.users = [...state.users, member];
        }
      })
      .addCase(addMemberToTask.rejected, (state, action) => {
        state.userErrorMessage = action.payload;
      })
      .addCase(addMemberToTask.fulfilled, (state, action) => {
        if (action.payload.exists) {
          const member = {
            email: action.payload.email,
          };

          state.userSuccessMessage = `Member ${member.email} Added`;

          state.users = [...state.users, member];
        }
      })
      .addCase(addMember.rejected, (state, action) => {
        state.userErrorMessage = action.payload;
      })
      .addCase(addManager.fulfilled, (state, action) => {
        if (action.payload.exists) {
          const manager = {
            email: action.payload.email,
            isManager: true,
          };

          state.userSuccessMessage = `Member ${manager.email} Added`;

          state.users = [...state.users, manager];
        }
      })
      .addCase(addManager.rejected, (state, action) => {
        state.userErrorMessage = action.payload;
      })
      .addCase(getTaskMembers.pending, (state, action) => {
        console.log('getTaskMembers pending');
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getTaskMembers.fulfilled, (state, action) => {
        console.log('getTaskMembers fulfilled');
        console.log(action.payload);
        const [notAssignedMembers, assignedMembers] = action.payload;
        state.notAssignedMembers = notAssignedMembers;
        state.taskMembers = assignedMembers;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getTaskMembers.rejected, (state, action) => {
        console.log('getTaskMembers rejected');
        console.log(action.payload);
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(submitInvitations.fulfilled, (state, action) => {
        state.userSuccessMessage = `Users have been Invited succesfully`;
      })
      .addCase(submitInvitations.rejected, (state, action) => {
        state.userErrorMessage = `Oops, an error has occured while submitting invitations`;
      })
      .addCase(submitInvitationsToTask.fulfilled, (state, action) => {
        state.userSuccessMessage = `Members have been Assigned succesfully`;
      })
      .addCase(submitInvitationsToTask.rejected, (state, action) => {
        state.userErrorMessage = `Oops, an error has occured while submitting invitations`;
      });
  },
});

export const { removeUser, setUserError, resetUserError, resetUserSuccess, setUserSuccess, resetInvite } =
  inviteSlice.actions;
export default inviteSlice.reducer;
