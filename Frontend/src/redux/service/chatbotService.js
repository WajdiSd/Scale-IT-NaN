import axios from 'axios';
import axiosInstance from 'src/utils/axios';
import { dispatch } from '../store';

const API_URL = process.env.REACT_APP_CHATBOT_API_ENDPOINT;

// setParticiants
const setParticiants = async (userData) => {
  return userData;
};

// addMessage
const addMessage = async (message) => {
  return message;
};

// addMessage
const askBot = async (body) => {
  const response = await axios.post(API_URL, body);
  return response.data;
};

const chatbotService = {
  setParticiants,
  addMessage,
  askBot,
};

export default chatbotService;
