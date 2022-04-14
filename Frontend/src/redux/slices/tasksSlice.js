//import VerifyCode from "src/pages/auth/VerifyCode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import taskService from '../service/taskService';
import { getBoard } from './kanban';

const initialState = {
  tasks: [],
  memberTasks: [],
  tasks_to_do: [],
  tasks_doing: [],
  tasks_done: [],
  tasks_review: [],

  isProjectManager: false,
  isTeamLeader: false,

  task: null,
  usersInTask: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetTask: (state) => {
      (state.tasks = []),
        (state.memberTasks = []),
        (state.tasks_to_do = []),
        (state.tasks_doing = []),
        (state.tasks_done = []),
        (state.tasks_review = []),
        (state.isProjectManager = false),
        (state.isTeamLeader = false),
        (state.task = null),
        (state.usersInTask = []),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = '');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state, action) => {
        console.log('addTask pending');
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log('addTask fulfilled');
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        console.log('addTask rejected');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getUserTasks.pending, (state, action) => {
        console.log('getUserTasks pending');
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        console.log('getUserTasks fulfilled');
        state.memberTasks = action.payload.tasks;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        console.log('getUserTasks rejected');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.task = action.payload.task;
      })
      .addCase(updateTask.rejected, (state, action) => {
        console.log('updateTask rejected');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(removeMembersFromTask.pending, (state, action) => {
        console.log('removeMembersFromTask pending');
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(removeMembersFromTask.fulfilled, (state, action) => {
        console.log('removeMembersFromTask fulfilled');
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(removeMembersFromTask.rejected, (state, action) => {
        console.log('removeMembersFromTask rejected');
        console.log(action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

// Create new project
export const addTask = createAsyncThunk('task/addTask', async (data, thunkAPI) => {
  try {
    return await taskService.addTask(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Fetch projects in workspace for HR and ProjectManagers
export const getUserTasks = createAsyncThunk('task/getUserTasks', async (object, thunkAPI) => {
  try {
    const listProjects = await taskService.getUserTasks(object);

    return listProjects;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update task
export const updateTask = createAsyncThunk('task/updateTask', async (data, thunkAPI) => {
  try {
    return await taskService.updateTask(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const removeMembersFromTask = createAsyncThunk('task/removeMembersFromTask', async (data, thunkAPI) => {
  try {
    const t = await taskService.removeMemberFromTask(data);
    if (t) {
      thunkAPI.dispatch(getBoard(data.projectId));
      return t;
    }}
    catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
  

export const { resetTask } = tasksSlice.actions;
export default tasksSlice.reducer;
