// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Progress, UncontrolledTooltip, Button } from 'reactstrap';
import classNames from 'classnames';
import { Loader } from 'react-feather';

import avatar1 from '../../../assets/images/users/avatar-6.jpg';
import avatar3 from '../../../assets/images/users/avatar-8.jpg';

import { projects } from './Data';


// single project
const Project = props => {
    const project = props.project || {};

    return (
        <Card className="border">
            <CardBody>
                <div className={classNames(
                    'badge', 'float-right',
                    {
                        'badge-success': project.state === 'Finished',
                        'badge-warning': project.state === 'Ongoing',
                        'badge-info': project.state === 'Planned',
                    }
                )}>
                    {project.state}
                </div>
                <p className={classNames("text-uppercase", "font-size-12", "mb-2",
                    {
                        'text-success': project.state === 'Finished',
                        'text-warning': project.state === 'Ongoing',
                        'text-info': project.state === 'Planned',
                    })}>{project.category}</p>

                <h5>
                    <a href="/" className="text-dark">
                        {project.title}
                    </a>
                </h5>


                <p className="text-muted mb-4">
                    {project.shortDesc}...
                    <a href="/" className="font-weight-bold text-muted ml-2">
                        view more
                    </a>
                </p>

                <div>
                    <a href="/" className="d-inline-block mr-1">
                        <img src={avatar3} className="avatar-sm m-1 rounded-circle" alt="friend" />
                    </a>

                    <a href="/" className="d-inline-block mr-1">
                        <img src={avatar1} className="avatar-sm m-1 rounded-circle" alt="friend" />
                    </a>
                    {project.totalMembers - 2 > 0 && (
                        <a href="/" className="">
                            <div className="avatar-sm font-weight-bold d-inline-block m-1">
                                <span className="avatar-title rounded-circle bg-soft-warning text-warning">+{project.totalMembers - 2}</span>
                            </div>
                        </a>
                    )}
                </div>
            </CardBody>

            <CardBody className="border-top">
                <Row className="align-items-center">
                    <Col className="col-sm-auto">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item pr-2">
                                <a href="/" className="text-muted d-inline-block" id={`dueDate-${project.id}`}>
                                    <i className="uil uil-calender mr-1"></i> {project.dueDate}
                                </a>
                                <UncontrolledTooltip placement="top" target={`dueDate-${project.id}`}>Due date</UncontrolledTooltip>
                            </li>
                            <li className="list-inline-item pr-2">
                                <a href="/" className="text-muted d-inline-block" id={`noTasks-${project.id}`}>
                                    <i className="uil uil-bars mr-1"></i> {project.totalTasks}</a>
                                <UncontrolledTooltip placement="top" target={`noTasks-${project.id}`}>Tasks</UncontrolledTooltip>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" className="text-muted d-inline-block" id={`noComments-${project.id}`}>
                                    <i className="uil uil-comments-alt mr-1"></i> {project.totalComments}
                                </a>
                                <UncontrolledTooltip placement="top" target={`noComments-${project.id}`}>Comments</UncontrolledTooltip>
                            </li>
                        </ul>
                    </Col>
                    <Col className="offset-sm-1">
                        {project.progress < 30 && (
                            <Progress value={project.progress} color="warning" className="progress-sm" />
                        )}
                        {project.progress > 30 && project.progress < 100 && (
                            <Progress value={project.progress} color="info" className="progress-sm" />
                        )}
                        {project.progress === 100 && (
                            <Progress value={project.progress} color="success" className="progress-sm" />
                        )}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const Projects = () => {

    return (
        <React.Fragment>
            <h5 className="mt-3">Projects</h5>

            <Row>
                {projects.map((project, i) => {
                    return (
                        <Col lg={6} xl={4} key={'proj-' + project.id}>
                            <Project project={project} />
                        </Col>
                    );
                })}
            </Row>

            <Row className="mb-3 mt-2">
                <Col>
                    <div className="text-center">
                        <Button color="white">
                            <Loader className="icon-dual icon-xs mr-2"></Loader>Load more
                        </Button>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Projects;
