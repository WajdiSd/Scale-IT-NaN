// @flow
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    } else return true;
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export { isUserAuthenticated, getLoggedInUser };
