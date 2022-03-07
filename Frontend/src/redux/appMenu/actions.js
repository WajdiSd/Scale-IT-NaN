// @flow
import {
    INIT_MENU,
    INIT_MENU_SUCCESS,
    CHANGE_ACTIVE_MENU_FROM_LOCATION,
    CHANGE_ACTIVE_MENU_FROM_LOCATION_SUCCESS,
} from './constants';

export const initMenu = () => ({
    type: INIT_MENU,
    payload: {},
});

export const initMenuSuccess = (menuItems) => ({
    type: INIT_MENU_SUCCESS,
    payload: { menuItems },
});

export const changeActiveMenuFromLocation = () => ({
    type: CHANGE_ACTIVE_MENU_FROM_LOCATION,
    payload: {},
});

export const changeActiveMenuFromLocationSuccess = (activatedMenuItemIds) => ({
    type: CHANGE_ACTIVE_MENU_FROM_LOCATION_SUCCESS,
    payload: { activatedMenuItemIds },
});
