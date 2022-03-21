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
import workspaceInviteReducer from './slices/workspaceInviteSlice';

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
  whitelist: ['isAuthenticated', 'user', 'isHr', 'isProjectManager'],
};

const workspacesPersistConfig = {
  key: 'workspaces',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['workspaces', 'workspace', 'usersInWorkspace'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  workspaceInvite: workspaceInviteReducer,
  product: persistReducer(productPersistConfig, productReducer),
  auth: persistReducer(userPersistConfig, authReducer),
  workspaces: persistReducer(workspacesPersistConfig, workspacesReducer),
});

export { rootPersistConfig, rootReducer };
