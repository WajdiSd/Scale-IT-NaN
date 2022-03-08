import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import * as FeatherIcon from 'react-feather';

import PageTitle from '../../../components/PageTitle';


const FeatherIcons = () => {
    const icons = [];
    for (var icon in FeatherIcon) {
        icons.push(icon);
    }

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Icons', path: '/ui/icons/feather' },
                            { label: 'Feather', path: '/ui/icons/feather', active: true },
                        ]}
                        title={'Feather Icons'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h5 className="mt-0 mb-1 header-title">Examples</h5>
                            <p className="mb-3">Use <code>&lt;i data-feather="activity"&gt;&lt;/i&gt;</code>.</p>

                            <Row className="icons-list">
                                {icons.map((icon, idx) => {
                                    const Icon = FeatherIcon[icon];
                                    return <Col xl={3} lg={4} sm={6} key={idx}>
                                        <div className="icon-item">
                                            <Icon></Icon>
                                            <span>{icon}</span>
                                        </div>
                                    </Col>
                                })}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h5 className="mt-0 mb-1 header-title">Two Tone Icons</h5>
                            <p className="mb-3">Use <code>&lt;i data-feather="activity" class="icon-dual"&gt;&lt;/i&gt;</code>.</p>

                            <Row className="icons-list">
                                {icons.map((icon, idx) => {
                                    const Icon = FeatherIcon[icon];
                                    return <Col xl={3} lg={4} sm={6} key={idx}>
                                        <div className="icon-item">
                                            <Icon className="icon-dual"></Icon>
                                            <span>{icon}</span>
                                        </div>
                                    </Col>
                                })}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h5 className="mt-0 mb-1 header-title">Sizes</h5>
                            <p className="mb-3">Use <code>&lt;i data-feather="activity" class="icon-**"&gt;&lt;/i&gt;</code>. Available sizes <code>sm,md,lg,xl,xxl</code></p>

                            <Row className="icons-list">
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-xs icon-dual"></FeatherIcon.Airplay>
                                        <span>Extra Small</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-sm icon-dual"></FeatherIcon.Airplay>
                                        <span>Small</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-lg icon-dual"></FeatherIcon.Airplay>
                                        <span>Large</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-xl icon-dual"></FeatherIcon.Airplay>
                                        <span>Extra Large</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-xxl icon-dual"></FeatherIcon.Airplay>
                                        <span>Extra Extra Large</span>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h5 className="mt-0 mb-1 header-title">Two Tones Color Variations</h5>
                            <p className="mb-3">Use <code>&lt;i data-feather="activity" class="icon-dual-**"&gt;&lt;/i&gt;</code>.</p>

                            <Row className="icons-list">
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-dual-primary"></FeatherIcon.Airplay>
                                        <span>Primary</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-dual-secondary"></FeatherIcon.Airplay>
                                        <span>Secondary</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-dual-success"></FeatherIcon.Airplay>
                                        <span>Success</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-dual-danger"></FeatherIcon.Airplay>
                                        <span>Danger</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-dual-warning"></FeatherIcon.Airplay>
                                        <span>Warning</span>
                                    </div>
                                </Col>
                                <Col xl={3} lg={4} sm={6}>
                                    <div className="icon-item">
                                        <FeatherIcon.Airplay className="icon-dual-info"></FeatherIcon.Airplay>
                                        <span>Info</span>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default FeatherIcons;
