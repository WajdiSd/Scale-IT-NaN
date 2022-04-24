import axiosInstance from 'src/utils/axios';

const API_URL = 'performance/';

const getScoreByWorkspace = async (memberId,workspaceId) => {
    const response = await axiosInstance.get(API_URL + 'scorebyworkspace/' +  memberId + '/' + workspaceId);
    return response.data;
};


const getRankByWorkspace = async (memberId,workspaceId) => {
    const response = await axiosInstance.get(API_URL + 'getrankworkspaceleaderboard/' + workspaceId + '/' +  memberId );
    return response.data;
}


const performanceService = {
    getScoreByWorkspace,
    getRankByWorkspace,
};

export default performanceService;