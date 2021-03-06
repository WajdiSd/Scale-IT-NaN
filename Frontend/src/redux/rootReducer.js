import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import authReducer from './slices/authSlice';
import workspacesReducer from './slices/workspaceSlice';
import inviteReducer from './slices/inviteSlice';
import projectReducer from './slices/projectSlice';
import taskReducer from './slices/tasksSlice';
import chatbotReducer from './slices/chatbotSlice';
import performanceReducer from './slices/performanceSlice';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated', 'user', 'isHr', 'isProjectManager', 'idHR', 'idProjectManager'],
};

const workspacesPersistConfig = {
  key: 'workspaces',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['workspaces', 'workspace', 'usersInWorkspace'],
};

const projectsPersistConfig = {
  key: 'projects',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['projects', 'project', 'usersInProject', 'isProjectManager', 'isTeamLeader'],
};

const tasksPersistConfig = {
  key: 'tasks',
  storage,
  keyPrefix: 'redux-',
  whitelist: [
    'tasks',
    'tasks_to_do',
    'tasks_doing',
    'tasks_doing',
    'tasks_done',
    'tasks_review',
    'isProjectManager',
    'isTeamLeader',
    'task',
    'usersInTask',
  ],
};
const chatbotPersistConfig = {
  key: 'chatbot',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['conversation', 'participants', 'newMessage'],
};
const performancePersistConfig = {
  key: 'performance',
  storage,
  keyPrefix: 'redux-',
  whitelist: [
    'scoreInWorkspace',
    'rankInWorkspace',
    'finishedTasksInTimePourcentage',
    'finishedTasksLatePourcentage',
    'finishedProjectsInTimePourcentage',
    'finishedProjectsLatePourcentage',
    'allfinishedTasksInTimePercentage',
    'allfinishedTasksLatePercentage',
    'projectprogress',
    'membercontribution',
    'numbertasksleft',
  ],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  invite: inviteReducer,
  auth: persistReducer(userPersistConfig, authReducer),
  workspaces: persistReducer(workspacesPersistConfig, workspacesReducer),
  projects: persistReducer(projectsPersistConfig, projectReducer),
  tasks: persistReducer(tasksPersistConfig, taskReducer),
  chatbot: persistReducer(chatbotPersistConfig, chatbotReducer),
  performance: persistReducer(performancePersistConfig, performanceReducer),
});

export { rootPersistConfig, rootReducer };
