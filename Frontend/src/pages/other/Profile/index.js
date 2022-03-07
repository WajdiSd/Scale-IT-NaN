import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';

import UserBox from './UserBox';
import Activities from './Activities';
import Messages from './Messages';
import Projects from './Projects';
import Tasks from './Tasks';
import Files from './Files';


class Profile extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    /**
     * Toggles tab
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
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Pages', path: '/pages/profile' },
                                { label: 'Profile', path: '/pages/profile', active: true },
                            ]}
                            title={'Profile'}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col lg={3}>
                        {/* User information */}
                        <UserBox />
                    </Col>

                    <Col lg={9}>
                        <Card>
                            <CardBody>
                                <Nav className="nav nav-pills navtab-bg nav-justified">
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggleTab('1'); }}
                                        >Activity</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggleTab('2'); }}
                                        >Messages</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggleTab('3'); }}
                                        >Projects</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '4' })}
                                            onClick={() => { this.toggleTab('4'); }}
                                        >Tasks</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '5' })}
                                            onClick={() => { this.toggleTab('5'); }}
                                        >Files</NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Activities />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Messages />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Projects />
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <Tasks />
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <Files />
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Profile;
