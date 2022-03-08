import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';

import ProjectStats from './Stats';
import About from './About';
import Comments from './Comments';
import Attachments from './Attachments';
import Activities from './Activities';


class ProjectDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            project: {
                title: 'Landing page Design',
                shortDesc: 'This card has supporting text below as a natural lead-in to additional content is a little bit longer',
                state: 'Completed',
                totalTasks: 210,
                totalTasksCompleted: 121,
                totalComments: 121,
                totalMembers: 12,
                totalHoursSpent: 2500,
                startDate: '17 July 2019',
                startTime: '1:00 PM',
                endDate: '22 July 2019',
                endTime: '1:00 PM',
                totalBudget: '$15,800',
                owner: 'Rick Perry'
            },
            activeTab: 'comments'
        }

        this.toggleTab = this.toggleTab.bind(this);
    }

    /**
     * 
     * @param {*} tab 
     */
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Row className="page-title">
                    <Col sm={8} xl={6}>
                        <h4 className="mb-1 mt-0">{`Project: ${this.state.project.title}`}</h4>
                    </Col>
                    <Col sm={4} xl={6} className="text-md-right">
                        <div className="btn-group ml-2 d-none d-sm-inline-block">
                            <button type="button" className="btn btn-soft-primary btn-sm"><i className="uil uil-edit mr-1"></i>Edit</button>
                        </div>
                        <div className="btn-group ml-1 d-none d-sm-inline-block">
                            <button type="button" className="btn btn-soft-danger btn-sm"><i className="uil uil-trash-alt mr-1"></i>Delete</button>
                        </div>
                    </Col>
                </Row>

                <ProjectStats {...this.state.project} />

                <Row>
                    <Col xl={8}>
                        <About />

                        <Card>
                            <CardBody>
                                <Nav className="nav-pills navtab-bg">
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === 'comments' })}
                                            onClick={() => { this.toggleTab('comments'); }}>Discussions</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === 'files' })}
                                            onClick={() => { this.toggleTab('files'); }}>Files/Resources</NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="comments">
                                        <Comments />
                                    </TabPane>
                                    <TabPane tabId="files">
                                        <Attachments />
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <CardBody>
                                <Activities />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment >
        );
    }
}

export default ProjectDetail;
