import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Confirm from '../pages/auth/Confirm';
import ForgetPassword from '../pages/auth/ForgetPassword';
import LockScreen from '../pages/auth/LockScreen';
import Login from '../pages/auth/Login';
import Logout from '../pages/auth/Logout';
import Register from '../pages/auth/Register';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// lazy load all the views


// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar/'));
const Projects = React.lazy(() => import('../pages/apps/Projects/'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Projects/Detail/'));
// - chat
const ChatApp = React.lazy(() => import('../pages/apps/Chat/'));
// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
// - tasks
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List/'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board/'));
// - file
const FileManager = React.lazy(() => import('../pages/apps/FileManager'));
//landing
const Landing = React.lazy(() => import('../pages/landing/'));

// extra pages
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));


export interface RoutesProps {
    path: RouteProps['path'];
    name?: string;
    component?: RouteProps['component'];
    route?: any;
    exact?: RouteProps['exact'];
    icon?: string;
    header?: string;
    roles?: string[];
    children?: RoutesProps[];
}

// root routes
const rootRoute: RoutesProps = {
    path: '/',
    exact: true,
    component: () => <Root />,
    route: Route,
};


const calendarAppRoutes: RoutesProps = {
    path: '/apps/calendar',
    name: 'Calendar',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'calendar',
    component: CalendarApp,
    header: 'Apps',
};

const chatAppRoutes: RoutesProps = {
    path: '/apps/chat',
    name: 'Chat',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'message-square',
    component: ChatApp,
};

const emailAppRoutes: RoutesProps = {
    path: '/apps/email',
    name: 'Email',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'mail',
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: Inbox,
            route: PrivateRoute,
        },
        {
            path: '/apps/email/details',
            name: 'Email Details',
            component: EmailDetail,
            route: PrivateRoute,
        },
        {
            path: '/apps/email/compose',
            name: 'Compose Email',
            component: EmailCompose,
            route: PrivateRoute,
        },
    ],
};

const projectAppRoutes: RoutesProps = {
    path: '/apps/projects',
    name: 'Projects',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-briefcase',

    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: Projects,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/details',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
        },
    ],
};

const taskAppRoutes: RoutesProps = {
    path: '/apps/tasks',
    name: 'Tasks',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'clipboard',
    children: [
        {
            path: '/apps/tasks/list',
            name: 'Task List',
            component: TaskList,
            route: PrivateRoute,
        },
        {
            path: '/apps/tasks/kanban',
            name: 'Kanban',
            component: Kanban,
            route: PrivateRoute,
        },
    ],
};

const fileAppRoutes: RoutesProps = {
    path: '/apps/file-manager',
    name: 'File Manager',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: FileManager,
};

const appRoutes = [calendarAppRoutes, chatAppRoutes, emailAppRoutes, projectAppRoutes, taskAppRoutes, fileAppRoutes];

// pages
const extrapagesRoutes: RoutesProps = {
    path: '/pages',
    name: 'Pages',
    icon: 'package',
    header: 'Custom',
    children: [
       
    ],
};

// ui
const uiRoutes: RoutesProps = {
    path: '/components',
    name: 'Components',
    icon: 'package',
    header: 'UI Elements',
    children: [
       
    ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
    let flatRoutes: RoutesProps[] = [];

    routes = routes || [];
    routes.forEach((item: RoutesProps) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// auth
const authRoutes: RoutesProps[] = [
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/auth/confirm',
        name: 'Confirm',
        component: Confirm,
        route: Route,
    },
    {
        path: '/auth/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/auth/lock-screen',
        name: 'Lock Screen',
        component: LockScreen,
        route: Route,
    },
    {
        path: '/auth/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
];
// public routes
const otherPublicRoutes: RoutesProps[] = [
    {
        path: '/landing',
        name: 'landing',
        component: Landing,
        route: Route,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        component: Error404,
        route: Route,
    },
    {
        path: '/error-500',
        name: 'Error - 500',
        component: Error500,
        route: Route,
    },
];


// All routes
const authProtectedRoutes = [rootRoute, ...appRoutes, extrapagesRoutes, uiRoutes];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
