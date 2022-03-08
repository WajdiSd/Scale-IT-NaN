import React from 'react';
import { Row, Col, Card, CardBody, Media } from 'reactstrap';
import { Grid, CheckSquare, Users, Clock } from 'react-feather';


const ProjectStats = (props) => {

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody className="p-0">
                            <h6 className="card-title border-bottom p-3 mb-0 header-title">Project Overview</h6>

                            <Row className="py-1">
                                <Col xl={3} sm={6}>
                                    <Media className="p-3">
                                        <Grid className="align-self-center icon-dual icon-lg mr-4"></Grid>
                                        <Media body>
                                            <h4 className="mt-0 mb-0">{props.totalTasks}</h4>
                                            <span className="text-muted font-size-13">Total Tasks</span>
                                        </Media>
                                    </Media>
                                </Col>
                                <Col xl={3} sm={6}>
                                    <Media className="p-3">
                                        <CheckSquare className="align-self-center icon-dual icon-lg mr-4"></CheckSquare>
                                        <Media body>
                                            <h4 className="mt-0 mb-0">{props.totalTasksCompleted}</h4>
                                            <span className="text-muted font-size-13">Total Tasks Completed</span>
                                        </Media>
                                    </Media>
                                </Col>
                                <Col xl={3} sm={6}>
                                    <Media className="p-3">
                                        <Users className="align-self-center icon-dual icon-lg mr-4"></Users>
                                        <Media body>
                                            <h4 className="mt-0 mb-0">{props.totalMembers}</h4>
                                            <span className="text-muted font-size-13">Total Team Size</span>
                                        </Media>
                                    </Media>
                                </Col>
                                <Col xl={3} sm={6}>
                                    <Media className="p-3">
                                        <Clock className="align-self-center icon-dual icon-lg mr-4"></Clock>
                                        <Media body>
                                            <h4 className="mt-0 mb-0">{props.totalHoursSpent}</h4>
                                            <span className="text-muted font-size-13">Total Hours Spent</span>
                                        </Media>
                                    </Media>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProjectStats;
