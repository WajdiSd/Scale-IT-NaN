import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import TaskList from '../../components/TaskList';
import TaskItem from '../../components/TaskItem';


const Tasks = () => {
    return (
        <Card>
            <CardBody className="pt-2 pb-3">
                <Button className="float-right mt-2" size={'sm'} color="primary">
                    View All
                </Button>
                <h5 className="mb-4 header-title">Tasks</h5>
                <PerfectScrollbar style={{ maxHeight: '376px' }}>
                    <TaskList>
                        <TaskItem title='Draft the new contract document for sales team' due_date="24 Aug, 2019" />
                        <TaskItem title='iOS App home page' due_date="23 Aug, 2019" className="mt-2" />
                        <TaskItem title='Write a release note for Shreyu' due_date="24 Aug, 2019" className="mt-2" />
                        <TaskItem title='Invite Greeva to a project shreyu admin' due_date="22 Aug, 2019" className="mt-2" />
                        <TaskItem title='Enable analytics tracking for main website' due_date="20 Aug, 2019" className="mt-2" />
                        <TaskItem title='Invite user to a project' due_date="18 Aug, 2019" className="mt-2" />
                        <TaskItem title='Write a release note' due_date="14 Aug, 2019" className="mt-2" />
                    </TaskList>
                </PerfectScrollbar>
            </CardBody>
        </Card>
    );
};

export default Tasks;
