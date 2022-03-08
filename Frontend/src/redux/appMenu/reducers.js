// @flow
import {
    INIT_MENU,
    INIT_MENU_SUCCESS,
    CHANGE_ACTIVE_MENU_FROM_LOCATION,
    CHANGE_ACTIVE_MENU_FROM_LOCATION_SUCCESS,
} from './constants';


const AppMenu = (state = {}, action) => {
    switch (action.type) {
        case INIT_MENU:
            return action.payload;
        case INIT_MENU_SUCCESS:
            return { ...state, ...action.payload };
        case CHANGE_ACTIVE_MENU_FROM_LOCATION:
            return { ...state };
        case CHANGE_ACTIVE_MENU_FROM_LOCATION_SUCCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default AppMenu;
