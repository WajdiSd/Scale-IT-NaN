import axios from "axios";
import axiosInstance from "src/utils/axios";
import { dispatch } from "../store";

const API_URL = 'workspace/';
const getWorkspaces = async(id) => {
  const response = await axiosInstance.get(API_URL+id);
  return response.data;
}
const workspaceService = {
  getWorkspaces
};

export default workspaceService;
