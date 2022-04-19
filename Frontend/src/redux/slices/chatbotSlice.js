//import VerifyCode from "src/pages/auth/VerifyCode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';


const initialState = {
  conversation: [],
  participants: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    resetTask: (state) => {
      (state.tasks = []),
        (state.conversation = []),
        (state.participants = []),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = '');
    },
  },
  extraReducers: (builder) => {
    builder
      
  },
});


export const { resetTask } = chatbotSlice.actions;
export default chatbotSlice.reducer;
