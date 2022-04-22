//import VerifyCode from "src/pages/auth/VerifyCode";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import chatbotService from '../service/chatbotService';
import uuidv4 from '../../utils/uuidv4';


const initialState = {
  conversation: {messages:[]},
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
    resetChatbot: (state) => {
      console.log("reset chatbot");
        (state.conversation = {messages:[]}),
        (state.participants = []),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = '');
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(setParticiants.fulfilled, (state, action) => {
      console.log("setting participants");
      state.isLoading = false;
      state.isSuccess = true;
      state.participants = action.payload;
      state.conversation.participants = action.payload
    })
    .addCase(setParticiants.pending, (state, action) => {
      state.isLoading = true;
      
    })
    .addCase(setParticiants.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
    .addCase(addMessage.fulfilled, (state, action) => {
      console.log("addMessage fulfilled");
      state.isLoading = false;
      state.isSuccess = true;
      state.conversation.messages.push(action.payload);
    })
    .addCase(addMessage.pending, (state, action) => {
      state.isLoading = true;

    })
    .addCase(addMessage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
    .addCase(askBot.fulfilled, (state, action) => {
      console.log("askBot fulfilled");
      console.log(action.payload);
      let chatbotId = null;
      state.participants.map((participant)=>{
        participant.type=='chatbot'? chatbotId = participant.id: null;
      });
      let message = {
        messageId: uuidv4(),
        message: action.payload[0]? action.payload[0].text: 'I do not understand',
        contentType: 'text',
        attachments: [],
        createdAt: new Date(),
        senderId: chatbotId,
      }
      state.conversation.messages.push(message);

      state.isLoading = false;
      state.isSuccess = true;
    })
    .addCase(askBot.pending, (state, action) => {
      state.isLoading = true;

    })
    .addCase(askBot.rejected, (state, action) => {
      console.log("askBot rejected");

      state.isLoading = false;
      state.isError = true;
    })
    ;
  },
});

// setParticiants
export const setParticiants = createAsyncThunk('chatbot/setParticiants', async (userData, thunkAPI) => {
  try {
    return await chatbotService.setParticiants(userData);
  } catch (error) {

    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// addMessage
export const addMessage = createAsyncThunk('chatbot/addMessage', async (message, thunkAPI) => {
  try {
    return await chatbotService.addMessage(message);
  } catch (error) {

    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// askBot
export const askBot = createAsyncThunk('chatbot/askBot', async (body, thunkAPI) => {
  try {
    return await chatbotService.askBot({"message": body.message, "sender": body.senderId});
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const { resetChatbot } = chatbotSlice.actions;
export default chatbotSlice.reducer;
