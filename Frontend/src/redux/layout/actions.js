// @flow
import {
    CHANGE_LAYOUT,
    CHANGE_LAYOUT_WIDTH,
    CHANGE_SIDEBAR_THEME,
    CHANGE_SIDEBAR_TYPE,
    TOGGLE_RIGHT_SIDEBAR,
    SHOW_RIGHT_SIDEBAR,
    HIDE_RIGHT_SIDEBAR,
} from './constants';


export const changeLayout = (layout) => ({
    type: CHANGE_LAYOUT,
    payload: layout,
});

export const changeLayoutWidth = (width) => ({
    type: CHANGE_LAYOUT_WIDTH,
    payload: width,
});

export const changeSidebarTheme = (theme) => ({
    type: CHANGE_SIDEBAR_THEME,
    payload: theme,
});

export const changeSidebarType = (sidebarType) => ({
    type: CHANGE_SIDEBAR_TYPE,
    payload: sidebarType,
});

export const toggleRightSidebar = () => ({
    type: TOGGLE_RIGHT_SIDEBAR,
    payload: null,
});

export const showRightSidebar = () => ({
    type: SHOW_RIGHT_SIDEBAR,
    payload: null,
});

export const hideRightSidebar = () => ({
    type: HIDE_RIGHT_SIDEBAR,
    payload: null,
});
