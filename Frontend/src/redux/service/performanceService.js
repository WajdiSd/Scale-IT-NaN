import axiosInstance from 'src/utils/axios';

const API_URL = 'performance/';

const getScoreByWorkspace = async (memberId,workspaceId) => {
    const response = await axiosInstance.get(API_URL + 'scorebyworkspace/' +  memberId + '/' + workspaceId);
    return response.data;
};


const performanceService = {
    getScoreByWorkspace,
};

export default performanceService;