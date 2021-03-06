import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import performanceService from '../service/performanceService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  scoreInWorkspace: 0,
  rankInWorkspace: 0,
  finishedProjectsInTimePourcentage: 0,
  finishedProjectsLatePourcentage: 0,
  finishedTasksInTimePourcentage: 0,
  finishedTasksLatePourcentage: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  allfinishedTasksInTimePercentage: 0,
  allfinishedTasksLatePercentage: 0,
  projectprogress: '',
  membercontribution: '',
  numbertasksleft: '',
};

export const performanceSlice = createSlice({
  name: 'performance',
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
    resetPerformance: (state) => {
      (state.scoreInWorkspace = ''),
        (state.rankInWorkspace = ''),
        (state.finishedProjectsInTimePourcentage = ''),
        (state.finishedProjectsLatePourcentage = ''),
        (state.finishedTasksInTimePourcentage = ''),
        (state.finishedTasksLatePourcentage = ''),
        (state.allfinishedTasksInTimePercentage = ''),
        (state.allfinishedTasksLatePercentage = ''),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.projectprogress = ''),
        (state.membercontribution = ''),
        (state.numbertasksleft = ''),
        (state.message = '');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScoreByWorkspace.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(getScoreByWorkspace.fulfilled, (state, action) => {
        state.scoreInWorkspace = action.payload.score;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Successfully fetched score';
      })
      .addCase(getRankByWorkspace.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(getRankByWorkspace.fulfilled, (state, action) => {
        state.rankInWorkspace = action.payload.rank;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Successfully fetched rank';
      })
      .addCase(getFinishedProjectsInTimePourcentage.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(getFinishedProjectsInTimePourcentage.fulfilled, (state, action) => {
        state.finishedProjectsInTimePourcentage = action.payload.finishedProjectsInTimePourcentage;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Successfully fetched finished projects in time pourcentage';
        console.log(state.message);
        console.log(action);
      })
      .addCase(getFinishedProjectsLatePourcentage.rejected, (state, action) => {
        console.log("getFinishedProjectsLatePourcentage.rejected");
        state.isLoading = false;
        console.log(action);
      })
      .addCase(getFinishedProjectsLatePourcentage.fulfilled, (state, action) => {
        console.log("getFinishedProjectsLatePourcentage.fulfilled");
        console.log(action);
        state.finishedProjectsLatePourcentage = action.payload.finishedProjectsLatePourcentage;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Successfully fetched finished Projects late pourcentage';
      })
      .addCase(getFinishedProjectsLatePourcentage.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getFinishedTasksInTimePourcentage.rejected, (state, action) => {
        state.isLoading = false;
        console.log('getFinishedTasksInTimePourcentage rejected');
      })
      .addCase(getFinishedTasksInTimePourcentage.fulfilled, (state, action) => {
        state.finishedTasksInTimePourcentage = action.payload.percentage;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Successfully fetched finished tasks in time pourcentage';
      })
      .addCase(getFinishedTasksLatePourcentage.rejected, (state, action) => {
        state.isLoading = false;
        console.log('getFinishedTasksLatePourcentage rejected');
      })
      .addCase(getFinishedTasksLatePourcentage.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getFinishedTasksLatePourcentage.fulfilled, (state, action) => {
        state.finishedTasksLatePourcentage = action.payload.percentage;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Successfully fetched finished tasks in time pourcentage';
        console.log(action);
      })
      //test C
      .addCase(getAllTasksInTimePercentage.rejected, (state, action) => {
        state.isLoading = false;
        console.log('getAllTasksInTimePercentage rejected');
      })
      .addCase(getAllTasksInTimePercentage.pending, (state, action) => {
        state.isLoading = true;
        console.log('getAllTasksInTimePercentage pending');
      })
      .addCase(getAllTasksInTimePercentage.fulfilled, (state, action) => {
        state.allfinishedTasksInTimePercentage = action.payload.percentage;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Successfully fetched all finished tasks in time pourcentage';
        console.log(action);
      })
      .addCase(getAllLateTasksPercentage.rejected, (state, action) => {
        state.isLoading = false;
        console.log('getAllLateTasksPercentage rejected');
      })
      .addCase(getAllLateTasksPercentage.pending, (state, action) => {
        state.isLoading = true;
        console.log('getAllTasksInTimePercentage pending');
      })
      .addCase(getAllLateTasksPercentage.fulfilled, (state, action) => {
        state.allfinishedTasksLatePercentage = action.payload.percentage;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Successfully fetched all finished tasks in time pourcentage';
        console.log(action);
      })
      .addCase(getProjectProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log('getProjectProgress rejected');
      })
      .addCase(getProjectProgress.pending, (state, action) => {
        state.isLoading = true;
        console.log('getProjectProgress pending');
      })
      .addCase(getProjectProgress.fulfilled, (state, action) => {
        state.projectprogress = action.payload.percentage;
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action);
      })
      .addCase(getMemberContribution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log('getMemberContribution rejected');
      })
      .addCase(getMemberContribution.pending, (state, action) => {
        state.isLoading = true;
        console.log('getMemberContribution pending');
      })
      .addCase(getMemberContribution.fulfilled, (state, action) => {
        state.membercontribution = action.payload.contribution;
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action);
      })
      .addCase(getnbrTasksLeft.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log('getnbrTasksLeft rejected');
      })
      .addCase(getnbrTasksLeft.pending, (state, action) => {
        state.isLoading = true;
        console.log('getnbrTasksLeft pending');
      })
      .addCase(getnbrTasksLeft.fulfilled, (state, action) => {
        state.numbertasksleft = action.payload.total;
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action);
      });
  },
});

export const getScoreByWorkspace = createAsyncThunk('performance/getScoreByWorkspace', async (data, thunkAPI) => {
  try {
    const response = await performanceService.getScoreByWorkspace(data.memberId, data.workspaceId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getRankByWorkspace = createAsyncThunk('performance/getRankByWorkspace', async (data, thunkAPI) => {
  try {
    const response = await performanceService.getRankByWorkspace(data.memberId, data.workspaceId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getFinishedProjectsInTimePourcentage = createAsyncThunk(
  'performance/getFinishedProjectsInTimePourcentage',
  async (workspaceId, thunkAPI) => {
    try {
      const response = await performanceService.getFinishedProjectsInTimePourcentage(workspaceId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFinishedProjectsLatePourcentage = createAsyncThunk(
  'performance/getFinishedProjectsLatePourcentage',
  async (workspaceId, thunkAPI) => {
    try {
      const response = await performanceService.getAllLateTasksPercentage(workspaceId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFinishedTasksInTimePourcentage = createAsyncThunk(
  'performance/getFinishedTasksInTimePourcentage',
  async (data, thunkAPI) => {
    try {
      const response = await performanceService.getFinishedTasksInTimePourcentage(data.projectid, data.memberId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFinishedTasksLatePourcentage = createAsyncThunk(
  'performance/getFinishedTasksLatePourcentage',
  async (data, thunkAPI) => {
    try {
      const response = await performanceService.getFinishedTasksLatePourcentage(data.projectid, data.memberId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllTasksInTimePercentage = createAsyncThunk(
  'performance/getAllTasksInTimePercentage',
  async (data, thunkAPI) => {
    try {
      const response = await performanceService.getAllTasksInTimePercentage(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllLateTasksPercentage = createAsyncThunk(
  'performance/getAllLateTasksPercentage',
  async (data, thunkAPI) => {
    try {
      const response = await performanceService.getAllLateTasksPercentage(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProjectProgress = createAsyncThunk('performance/getProjectProgress', async (idproject, thunkAPI) => {
  try {
    const response = await performanceService.getprojectprogress(idproject);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getMemberContribution = createAsyncThunk('performance/getMemberContribution', async (data, thunkAPI) => {
  try {
    const response = await performanceService.getmembercontribution(data);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getnbrTasksLeft = createAsyncThunk('performance/getnbrTasksLeft', async (data, thunkAPI) => {
  try {
    const response = await performanceService.getnbrtasksleft(data);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const { resetPerformance } = performanceSlice.actions;
export default performanceSlice.reducer;
