export interface MenuItemTypes {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboards',
        label: 'Dashboards',
        isTitle: false,
        icon: 'home',
        badge: { variant: 'success', text: '02' },
        children: [
            {
                key: 'ds-ecommerce',
                label: 'Ecommerce',
                url: '/dashboard/ecommerce',
                parentKey: 'dashboards',
            },
            {
                key: 'ds-analytics',
                label: 'Analytics',
                url: '/dashboard/analytics',
                parentKey: 'dashboards',
            },
        ],
    },
    { key: 'apps', label: 'l fou9aneya', isTitle: true },
    {
        key: 'apps-calendar',
        label: 'Calendar',
        isTitle: false,
        icon: 'calendar',
        url: '/apps/calendar',
    },
    {
        key: 'apps-projects',
        label: 'Projects',
        isTitle: false,
        icon: 'briefcase',
        children: [
            {
                key: 'project-list',
                label: 'List',
                url: '/apps/projects/list',
                parentKey: 'apps-projects',
            },
            {
                key: 'project-details',
                label: 'Details',
                url: '/apps/projects/details',
                parentKey: 'apps-projects',
            },
        ],
    },
    {
        key: 'apps-tasks',
        label: 'Tasks',
        isTitle: false,
        icon: 'clipboard',
        children: [
            {
                key: 'task-list',
                label: 'List',
                url: '/apps/tasks/list',
                parentKey: 'apps-tasks',
            },
            {
                key: 'task-kanban',
                label: 'Kanban Board',
                url: '/apps/tasks/kanban',
                parentKey: 'apps-tasks',
            },
        ],
    },
    {
        key: 'apps-file-manager',
        label: 'Claims Manager',
        isTitle: false,
        icon: 'file-plus',
        url: '/apps/file-manager',
    },
    { key: 'custom', label: 'eloutaneya', isTitle: true },
    {
        key: 'extra-pages',
        label: 'TEST PAGES',
        isTitle: false,
        icon: 'file-text',
        children: [
            {
                key: 'page-starter',
                label: 'test1',
                url: '/pages/starter',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-profile',
                label: 'test2',
                url: '/pages/profile',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-activity',
                label: 'test3',
                url: '/pages/activity',
                parentKey: 'extra-pages',
            },
        ],
    }
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboards',
        icon: 'home',
        label: 'Dashboards',
        isTitle: true,
        children: [
            {
                key: 'ds-ecommerce',
                label: 'Ecommerce',
                url: '/dashboard/ecommerce',
                parentKey: 'dashboards',
            },
            {
                key: 'ds-analytics',
                label: 'Analytics',
                url: '/dashboard/analytics',
                parentKey: 'dashboards',
            },
        ],
    },
    {
        key: 'apps',
        icon: 'layers',
        label: 'Apps',
        isTitle: true,
        children: [
            {
                key: 'apps-calendar',
                label: 'Calendar',
                isTitle: false,
                url: '/apps/calendar',
                parentKey: 'apps',
            },
            {
                key: 'apps-chat',
                label: 'Chat',
                isTitle: false,
                url: '/apps/chat',
                parentKey: 'apps',
            },
            {
                key: 'apps-projects',
                label: 'Projects',
                isTitle: false,
                parentKey: 'apps',
                children: [
                    {
                        key: 'project-list',
                        label: 'List',
                        url: '/apps/projects/list',
                        parentKey: 'apps-projects',
                    },
                    {
                        key: 'project-details',
                        label: 'Details',
                        url: '/apps/projects/details',
                        parentKey: 'apps-projects',
                    },
                ],
            },
            {
                key: 'apps-tasks',
                label: 'Tasks',
                isTitle: false,
                parentKey: 'apps',
                children: [
                    {
                        key: 'task-list',
                        label: 'List',
                        url: '/apps/tasks/list',
                        parentKey: 'apps-tasks',
                    },
                    {
                        key: 'task-kanban',
                        label: 'Kanban Board',
                        url: '/apps/tasks/kanban',
                        parentKey: 'apps-tasks',
                    },
                ],
            },
            {
                key: 'apps-file-manager',
                label: 'Claims Manager',
                isTitle: false,
                url: '/apps/file-manager',
                parentKey: 'apps',
            },
        ],
    },
    {
        key: 'extra-pages',
        label: 'TEST-PAGES-Horizontal',
        isTitle: false,
        icon: 'file-text',
        children: [
            {
                key: 'page-starter',
                label: 'test1',
                url: '/pages/starter',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-profile',
                label: 'test2',
                url: '/pages/profile',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-activity',
                label: 'test3',
                url: '/pages/activity',
                parentKey: 'extra-pages',
            },
        ],
    },
];

const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboards',
        label: 'Dashboards',
        isTitle: true,
        icon: 'home',
        children: [
            {
                key: 'ds-ecommerce',
                label: 'Ecommerce',
                url: '/dashboard/ecommerce',
                parentKey: 'dashboards',
            },
            {
                key: 'ds-analytics',
                label: 'Analytics',
                url: '/dashboard/analytics',
                parentKey: 'dashboards',
            },
        ],
    },
    {
        key: 'apps',
        icon: 'grid',
        label: 'Apps',
        isTitle: true,
        children: [
            {
                key: 'apps-calendar',
                label: 'Calendar',
                isTitle: false,
                icon: 'calendar',
                url: '/apps/calendar',
                parentKey: 'apps',
            },
            {
                key: 'apps-chat',
                label: 'Chat',
                isTitle: false,
                icon: 'message-square',
                url: '/apps/chat',
                parentKey: 'apps',
            },
            {
                key: 'apps-projects',
                label: 'Projects',
                isTitle: false,
                icon: 'briefcase',
                parentKey: 'apps',
                children: [
                    {
                        key: 'project-list',
                        label: 'List',
                        url: '/apps/projects/list',
                        parentKey: 'apps-projects',
                    },
                    {
                        key: 'project-details',
                        label: 'Details',
                        url: '/apps/projects/details',
                        parentKey: 'apps-projects',
                    },
                ],
            },
            {
                key: 'apps-tasks',
                label: 'Tasks',
                isTitle: false,
                icon: 'clipboard',
                parentKey: 'apps',
                children: [
                    {
                        key: 'task-list',
                        label: 'List',
                        url: '/apps/tasks/list',
                        parentKey: 'apps-tasks',
                    },
                    {
                        key: 'task-kanban',
                        label: 'Kanban Board',
                        url: '/apps/tasks/kanban',
                        parentKey: 'apps-tasks',
                    },
                ],
            },
            {
                key: 'apps-file-manager',
                label: 'Claims Manager',
                isTitle: false,
                icon: 'file-plus',
                url: '/apps/file-manager',
                parentKey: 'apps',
            },
        ],
    },
    
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
