import React from 'react';
import { Row, Col, Card, CardBody, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Media, Button } from 'reactstrap';
import Flatpickr from 'react-flatpickr'
import { Tag, Clock, Package, Briefcase } from 'react-feather';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import TaskList from '../../../components/TaskList';
import TaskItem from '../../../components/TaskItem';
import ChatList from '../../../components/ChatList';
import OverviewWidget from '../../../components/OverviewWidget';

import avatarImg1 from '../../../assets/images/users/avatar-1.jpg';
import avatarImg4 from '../../../assets/images/users/avatar-4.jpg';
import avatarImg7 from '../../../assets/images/users/avatar-7.jpg';
import avatarImg9 from '../../../assets/images/users/avatar-9.jpg';



const Member = ({ image, name, description, className }) => {
    return (

        <Media className="mt-1 border-top pt-3">
            <img src={image} className={`avatar rounded mr-3 ${className}`} alt={name} />
            <Media body>
                <h6 className="mt-1 mb-0 font-size-15">{name}</h6>
                <h6 className="text-muted font-weight-normal mt-1 mb-3">{description}</h6>
            </Media>
            <UncontrolledDropdown className="align-self-center float-right">
                <DropdownToggle tag="button" className='btn btn-link p-0 dropdown-toggle text-muted'>
                    <i className="uil uil-ellipsis-v"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <i className="uil uil-edit-alt mr-2"></i>Edit
                    </DropdownItem>
                    <DropdownItem>
                        <i className="uil uil-exit mr-2"></i>Remove from Team
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="text-danger">
                        <i className="uil uil-trash mr-2"></i>Delete
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Media>
    )
}

const TeamMembers = () => {
    return <Card>
        <CardBody className="pt-2">
            <h6 className="header-title mb-4">Team Members</h6>

            <Member image={avatarImg7} name="Shreyu N" description="Senior Sales Guy" />
            <Member image={avatarImg9} name="Greeva Y" description="Social Media Campaign" />
            <Member image={avatarImg4} name="Nik G" description="Inventory Manager" />
            <Member image={avatarImg1} name="Hardik G" description="Sales Person" />

        </CardBody>
    </Card>
}

const Events = () => {
    return <Card>
        <CardBody className="pt-2 pb-3">
            <UncontrolledDropdown className="align-self-center float-right">
                <DropdownToggle tag="button" className='btn btn-link dropdown-toggle text-muted px-1'>
                    <i className="uil uil-ellipsis-v"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem><i className="uil uil-edit-alt mr-2"></i>Edit</DropdownItem>
                    <DropdownItem><i className="uil uil-refresh mr-2"></i>Refresh</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="text-danger"><i className="uil uil-trash mr-2"></i>Delete</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>

            <h6 className="header-title mb-4">Team Events</h6>

            <Row className="calendar-widget">
                <Col sm={6}>
                    <Flatpickr options={{ inline: true, shorthandCurrentMonth: true }} />
                </Col>
                <Col sm={6}>
                    <ul className="list-unstyled ml-sm-3 pl-sm-5 mt-4 mt-sm-0">
                        <li className="mb-4">
                            <p className="text-muted mb-0 font-size-13">
                                <i className="uil uil-calender mr-1"></i>7:30 AM - 10:00 AM</p>
                            <h6 className="mt-1 font-size-16">UX Planning Meeting</h6>
                        </li>
                        <li className="mb-4">
                            <p className="text-muted mb-0 font-size-13">
                                <i className="uil uil-calender mr-1"></i>10:30 AM - 11:45 AM</p>
                            <h6 className="mt-1 font-size-16">Hyper v3 Scope Review</h6>
                        </li>
                        <li className="mb-4">
                            <p className="text-muted mb-0 font-size-13">
                                <i className="uil uil-calender mr-1"></i>12:15 PM - 02:00 PM</p>
                            <h6 className="mt-1 font-size-16">Ubold v4 Brainstorming</h6>
                        </li>
                        <li className="mb-4">
                            <p className="text-muted mb-0 font-size-13">
                                <i className="uil uil-calender mr-1"></i>5:30 PM - 06:15 PM</p>
                            <h6 className="mt-1 font-size-16">Shreyu React Planning</h6>
                        </li>
                        <li>
                            <a href="/" className="btn btn-primary btn-block w-75 mb-0"><i className="uil uil-focus-add mr-2"></i>Add Event</a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </CardBody>
    </Card>
}

const Chat = () => {
    const chatMessages = [
        { id: 1, userPic: avatarImg4, userName: 'Geneva', text: 'Hello!', postedOn: '10:00' },
        {
            id: 2,
            userPic: avatarImg7,
            userName: 'Shreyu',
            text: 'Hi, How are you? What about our next meeting?',
            postedOn: '10:01',
        },
        { id: 3, userPic: avatarImg4, userName: 'Geneva', text: 'Yeah everything is fine', postedOn: '10:02' },
        { id: 4, userPic: avatarImg7, userName: 'Shreyu', text: "Wow that's great!", postedOn: '10:03' },
        { id: 5, userPic: avatarImg7, userName: 'Shreyu', text: 'Cool!', postedOn: '10:03' },
    ];

    return (
        <ChatList messages={chatMessages} height="268px"></ChatList>
    );
};

const Stats = () => {
    return <OverviewWidget title="Stats" cardBodyClass="pt-2" bodyClass="px-3 py-3" items={[
        { title: '2100', description: 'Total Tasks Completed', icon: Package },
        { title: '21,000', description: 'Total Hours Worked', icon: Clock },
        { title: '1095', description: 'Total Issues Fixed', icon: Briefcase },
        { title: '51,200', description: 'Total Commits', icon: Tag }
    ]}></OverviewWidget>
}


const Tasks = () => {
    return (
        <Card>
            <CardBody className="pt-2 pb-3">
                <Button className="float-right mt-2" size={'sm'} color="primary">
                    View All
                </Button>
                <h5 className="mb-4">Tasks</h5>
                <PerfectScrollbar style={{ maxHeight: '339px' }}>
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

const Activity = () => (
    <Card>
        <CardBody className="pt-2 pb-3">
            <Button className="float-right mt-2" size={'sm'} color="primary">
                View All
                </Button>
            <h5 className="mb-4">Activity</h5>

            <Media className="mt-5">
                <img src={avatarImg7} className="mr-3 avatar rounded-circle" alt="shreyu" />
                <Media body>
                    <h6 className="mt-0 mb-0 font-size-15 font-weight-normal">
                        <a href="/" className="font-weight-bold">Shreyu</a> has attached design-draft.sketch in project <span className="font-weight-bold text-primary">Admin</span>
                    </h6>
                    <p className="text-muted">2 Min Ago</p>
                </Media>
            </Media>

            <Media className="mt-3">
                <div className="avatar mr-3 font-size-24 font-weight-normal">
                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">G</span>
                </div>
                <Media body>
                    <h6 className="mt-0 mb-0 font-size-15 font-weight-normal">
                        <a href="/" className="font-weight-bold">Greeva</a> has commented on project <span className="font-weight-bold text-primary">Admin</span>
                    </h6>
                    <p className="text-muted">12 Min Ago</p>
                </Media>
            </Media>

            <Media className="mt-3">
                <img src={avatarImg9} className="mr-3 avatar rounded-circle" alt="shreyu" />
                <Media body>
                    <h6 className="mt-0 mb-0 font-size-15 font-weight-normal">
                        <a href="/" className="font-weight-bold">Mannat</a> has reacted with <i className='uil uil-thumbs-up text-success font-size-13'></i> on comment from <span
                            className="font-weight-bold text-primary">Shreyu</span> on project <span className="font-weight-bold text-primary">Admin</span>
                    </h6>
                    <p className="text-muted">14 Min Ago</p>
                </Media>
            </Media>

            <Media className="mt-3">
                <div className="avatar mr-3 font-size-24 font-weight-normal">
                    <span
                        className="avatar-title rounded-circle bg-soft-success text-success">D</span>
                </div>
                <Media body>
                    <h6 className="mt-0 mb-0 font-size-15 font-weight-normal">
                        <a href="/" className="font-weight-bold">Dhyani</a> has reacted with <i
                            className='uil uil-heart-sign text-danger font-size-13'></i> on comment
                                                from <span className="font-weight-bold text-primary">Shreyu</span> on project <span className="font-weight-bold text-primary">Admin</span>
                    </h6>
                    <p className="text-muted">14 Min Ago</p>
                </Media>
            </Media>

        </CardBody>
    </Card>
)

const Team = () => {
    return <React.Fragment>
        <h5 className="mb-4">Team</h5>

        <Row>
            <Col xl={3}>
                <TeamMembers />
            </Col>

            <Col xl={5}>
                <Events />
            </Col>

            <Col xl={4}>
                <Chat />
            </Col>
        </Row>

        <Row>
            <Col xl={4} md={6}>
                <Stats />
            </Col>
            <Col xl={4} md={6}>
                <Tasks />
            </Col>
            <Col xl={4} md={6}>
                <Activity />
            </Col>
        </Row>


    </React.Fragment>
}

export default Team;