import avatarImg2 from '../../../assets/images/users/avatar-9.jpg';
import avatarImg3 from '../../../assets/images/users/avatar-3.jpg';
import avatarImg4 from '../../../assets/images/users/avatar-4.jpg';
import avatarImg5 from '../../../assets/images/users/avatar-5.jpg';
import avatarImg6 from '../../../assets/images/users/avatar-6.jpg';


const todayTasks = [
    {
        id: 1,
        title: 'Draft the new contract document for sales team',
        assigned_to: 'Arya Stark',
        assignee_avatar: avatarImg2,
        due_date: 'Today 10am',
        completed: false,
        priority: 'High',
        stage: 'Todo',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    },
    {
        id: 2,
        title: 'iOS App home page',
        assigned_to: 'James B',
        assignee_avatar: avatarImg3,
        due_date: 'Today 4pm',
        completed: false,
        stage: 'In-progress',
        priority: 'High',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    },
    {
        id: 3,
        title: 'Write a release note',
        assigned_to: 'Kevin C',
        assignee_avatar: avatarImg4,
        due_date: 'Today 4pm',
        completed: false,
        stage: 'In-progress',
        priority: 'Medium',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    }
];

const upcomingTasks = [
    {
        id: 4,
        title: 'Invite user to a project',
        assigned_to: 'Arya Stark',
        assignee_avatar: avatarImg2,
        due_date: 'Tomorrow 10am',
        stage: 'Todo',
        completed: false,
        priority: 'Low',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    },
    {
        id: 5,
        title: 'Enable analytics tracking',
        assigned_to: 'James B',
        assignee_avatar: avatarImg5,
        due_date: '27 Aug 10am',
        completed: false,
        stage: 'Review',
        priority: 'Low',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    },
    {
        id: 6,
        title: 'Code HTML email template',
        assigned_to: 'Kevin C',
        assignee_avatar: avatarImg6,
        due_date: 'No Due Date',
        completed: false,
        stage: 'Review',
        priority: 'Medium',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    }
];

const otherTasks = [
    {
        id: 7,
        title: 'Coordinate with business development',
        assigned_to: 'Arya Stark',
        assignee_avatar: avatarImg2,
        due_date: 'No Due Date',
        stage: 'Todo',
        completed: false,
        priority: 'High',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    },
    {
        id: 8,
        title: 'Kanban board design',
        assigned_to: 'James B',
        assignee_avatar: avatarImg5,
        stage: 'Review',
        due_date: '30 Aug 10am',
        completed: false,
        priority: 'Low',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    },
    {
        id: 9,
        title: 'Draft the new contract document for sales team',
        assigned_to: 'Kevin C',
        assignee_avatar: avatarImg6,
        due_date: 'No Due Date',
        stage: 'Done',
        completed: false,
        priority: 'Medium',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    },
    {
        id: 10,
        title: 'Draft the new contract document for vendor Abc',
        assigned_to: 'Kevin C',
        assignee_avatar: avatarImg6,
        due_date: '2 Sep 10am',
        completed: false,
        stage: 'Done',
        priority: 'Medium',
        checklists: [
            { id: 1, title: 'Find out the old contract documents', completed: false },
            { id: 2, title: 'Organize meeting sales associates to understand need in detail', completed: false },
            { id: 3, title: 'Make sure to cover every small details', completed: false }
        ],
        description: "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>",
        attachments: [
            { id: 1, filename: 'sales-assets.zip', 'size': '2.3 MB' },
            { id: 2, filename: 'new-contarcts.docx', 'size': '1.3 MB' }
        ],
        comments: [
            { id: 1, author: 'Arya Stark', text: 'Should I review the last 3 years legal documents as well?', posted_on: '4:30am', author_avatar: avatarImg2 },
            { id: 2, author: 'Gary Somya', text: '@Arya FYI..I have created some general guidelines last year.', posted_on: '3:30am', author_avatar: avatarImg3 },
        ]
    }
];

const projects = [
    {
        id: 1,
        title: 'Ubold v3.0 - Redesign',
        state: 'Finished',
        shortDesc: 'With supporting text below as a natural lead-in to additional contenposuere erat a ante. If several languages coalesce, the grammar',
        totalTasks: 21,
        totalComments: 741,
        totalMembers: 10,
        progress: 100,
        category: 'Web Design',
        dueDate: '15 Dec'
    },
    {
        id: 2,
        title: 'Minton v3.0 - Redesign',
        state: 'Ongoing',
        shortDesc:
            'This card has supporting text below as a natural lead-in to additional content is a little bit longer',
        totalTasks: 81,
        totalComments: 103,
        totalMembers: 6,
        progress: 21,
        category: 'Web Design',
        dueDate: '15 Dec'
    },
    {
        id: 3,
        title: 'Hyper v2.1 - Angular and Django',
        state: 'Ongoing',
        shortDesc: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid',
        totalTasks: 12,
        totalComments: 48,
        totalMembers: 2,
        progress: 66,
        category: 'Web Design',
        dueDate: '20 Dec'
    },
    {
        id: 4,
        title: 'Hyper v2.1 - React, Webpack',
        state: 'Finished',
        shortDesc: "Some quick example text to build on the card title and make up the bulk of the card's content",
        totalTasks: 50,
        totalComments: 1024,
        totalMembers: 5,
        progress: 100,
        category: 'Web Design',
        dueDate: '22 Dec'
    },
    {
        id: 5,
        title: 'Hyper 2.2 - Vue.Js and Laravel',
        state: 'Ongoing',
        shortDesc:
            'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.',
        totalTasks: 3,
        totalComments: 104,
        totalMembers: 3,
        progress: 45,
        category: 'Android',
        dueDate: '17 Dec'
    },
    {
        id: 6,
        title: 'Hyper 2.3 - Rails, NodeJs, Mean',
        state: 'Planned',
        shortDesc:
            'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.',
        totalTasks: 11,
        totalComments: 201,
        totalMembers: 5,
        progress: 55,
        category: 'Web Design',
        dueDate: '20 Dec'
    },
    {
        id: 7,
        title: 'Hyper - Landing page and UI Kit',
        state: 'Planned',
        shortDesc:
            'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.',
        totalTasks: 3,
        totalComments: 104,
        totalMembers: 3,
        progress: 45,
        category: 'Android',
        dueDate: '25 Dec'
    },
    {
        id: 8,
        title: 'Hyper 3.0 - Scoping',
        state: 'Finished',
        shortDesc:
            'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.',
        totalTasks: 3,
        totalComments: 104,
        totalMembers: 3,
        progress: 100,
        category: 'Web Design',
        dueDate: '30 Dec'
    },
];


const files = [
    { id: 1, name: 'sales-assets.zip', 'size': '2.3 MB' },
    { id: 2, name: 'new-contarcts.docx', 'size': '1.3 MB' }
];

const allTasks = [...todayTasks, ...upcomingTasks, ...otherTasks];

export { todayTasks, upcomingTasks, otherTasks, allTasks, projects, files };