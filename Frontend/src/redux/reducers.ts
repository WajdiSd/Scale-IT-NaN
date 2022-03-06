import { combineReducers } from 'redux';
import authReducer from "../rdx/user/authSlice";

import Auth from './auth/reducers';
import Layout from './layout/reducers';

export default combineReducers({
    Auth,
    Layout,
    auth: authReducer,
});
