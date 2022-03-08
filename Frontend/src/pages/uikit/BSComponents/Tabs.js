import React, { Component } from 'react';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: '2' };
        this.toggle = this.toggle.bind(this);
    }

    /**
     * Toggle the tab
     */
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    render() {
        const tabContents = [
            {
                id: '1',
                title: 'Home',
                icon: 'uil-home-alt',
                text:
                    'Home - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
            },
            {
                id: '2',
                title: 'Profile',
                icon: 'uil-user',
                text:
                    'Profile - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
            },
            {
                id: '3',
                title: 'Messages',
                icon: 'uil-envelope',
                text:
                    'Messages - Food truck quinoa dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
            },
        ];

        return (
            <React.Fragment>

                <Row>
                    <Col lg={6}>
                        <Card>
                            <CardBody>
                                <h5 className="header-title mb-3 mt-0">Nav Tabs</h5>

                                <Nav tabs>
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <NavItem key={index}>
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: this.state.activeTab === tab.id })}
                                                    onClick={() => {
                                                        this.toggle(tab.id);
                                                    }}>
                                                    <i
                                                        className={classnames(
                                                            tab.icon,
                                                            'd-sm-none',
                                                            'd-block',
                                                            'mr-1'
                                                        )}></i>
                                                    <span className="d-none d-sm-block">{tab.title}</span>
                                                </NavLink>
                                            </NavItem>
                                        );
                                    })}
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <TabPane tabId={tab.id} key={index}>
                                                <Row>
                                                    <Col sm="12">
                                                        <p className="mt-3">{tab.text}</p>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        );
                                    })}
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* tab pills */}
                    <Col lg={6}>
                        <Card>
                            <CardBody>
                                <h5 className="header-title mb-3 mt-0">Nav Pills</h5>

                                <Nav className="nav nav-pills navtab-bg nav-justified">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <NavItem key={index}>
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: this.state.activeTab === tab.id })}
                                                    onClick={() => {
                                                        this.toggle(tab.id);
                                                    }}>
                                                    <i
                                                        className={classnames(
                                                            tab.icon,
                                                            'd-sm-none',
                                                            'd-block',
                                                            'mr-1'
                                                        )}></i>
                                                    <span className="d-none d-sm-block">{tab.title}</span>
                                                </NavLink>
                                            </NavItem>
                                        );
                                    })}
                                </Nav>

                                <TabContent activeTab={this.state.activeTab}>
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <TabPane tabId={tab.id} key={index}>
                                                <Row>
                                                    <Col sm="12">
                                                        <p className="mt-2">{tab.text}</p>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        );
                                    })}
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Tabs;
