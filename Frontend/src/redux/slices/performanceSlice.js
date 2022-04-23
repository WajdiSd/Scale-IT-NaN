import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import performanceService from '../service/performanceService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  scoreInWorkspace: '',
  ranksInWorkspace: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
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
            (state.isError = false),
            (state.isSuccess = false),
            (state.isLoading = false),
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
      }
})

export const getScoreByWorkspace = createAsyncThunk(
    'performance/getScoreByWorkspace',
    async (data, thunkAPI) => {
        try {
            const response = await performanceService.getScoreByWorkspace(data.memberId, data.workspaceId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getRankByWorkspace = createAsyncThunk(
    'performance/getRankByWorkspace',
    async (data, thunkAPI) => {
        try {
            const response = await performanceService.getRankByWorkspace(data.workspaceId, data.memberId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const { resetPerformance } = performanceSlice.actions;
export default performanceSlice.reducer;
