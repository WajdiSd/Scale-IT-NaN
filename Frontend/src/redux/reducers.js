// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import authReducer from '../rdx/user/authSlice';

console.log(authReducer);
export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    authReducer,
});
