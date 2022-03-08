import React from 'react';
import { Row, Col, Card, CardBody, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Media } from 'reactstrap';
import { Users, Eye, FileText } from 'react-feather';

import avatarImg2 from '../../../assets/images/covers/2.jpg';
import avatarImg7 from '../../../assets/images/users/avatar-7.jpg';
import img4 from '../../../assets/images/small/img-4.jpg';
import img5 from '../../../assets/images/small/img-5.jpg';
import img6 from '../../../assets/images/small/img-6.jpg';


const Profiles = () => {
    return <React.Fragment>
        <h5 className="mb-4">Profile/User</h5>

        <Row>
            <Col md={6} xl={3}>
                <Card>
                    <CardBody className="pb-0">
                        <div className="text-center mt-3">
                            <img src={avatarImg7} alt=""
                                className="avatar-xl rounded-circle" />
                            <h5 className="mt-2 mb-0">Shreyu N</h5>
                            <h6 className="text-muted font-weight-normal mt-2 mb-4">User Experience Specialist</h6>

                            <button type="button" className="btn btn-primary btn-sm mr-1">Follow</button>
                            <button type="button" className="btn btn-white btn-sm">Message</button>

                            <div className="mt-4 pt-3 border-top text-left">
                                <p className="text-muted mb-2">Hi I'm Shreyu. I am user experience and user
                                    interface designer.
                                                I have been working on UI & UX since last 10 years.</p>

                                <p className="mb-2">
                                    <label className="badge badge-soft-success mr-1">UI & UX</label>
                                    <label className="badge badge-soft-success">Frontend Development</label>
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col md={6} xl={3}>
                <Card className="profile-widget">
                    <img src={avatarImg2} alt="Shreyu" className="card-img-top" />

                    <UncontrolledDropdown className="card-action float-right">
                        <DropdownToggle tag="button" className="dropdown-toggle arrow-none btn btn-link text-white p-0">
                            <i className="uil uil-ellipsis-v font-size-16 text-white"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem><i className="uil uil-edit-alt mr-2"></i>Edit</DropdownItem>
                            <DropdownItem><i className="uil uil-refresh mr-2"></i>Refresh</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem className="text-danger"><i className="uil uil-trash mr-2"></i>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <CardBody className="text-center p-0">
                        <div className="profile-info pb-3">
                            <img src={avatarImg7} alt=""
                                className="img-thumbnail avatar-xl rounded-circle" />
                            <h5 className="mt-2 mb-0">Shreyu N</h5>
                            <h6 className="text-muted font-weight-normal mt-2 mb-4">User Experience
                                Specialist
                                        </h6>
                            <button type="button" className="btn btn-primary btn-sm mr-1">Follow</button>
                            <button type="button" className="btn btn-white btn-sm">Message</button>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col md={6} xl={3}>
                <Card>
                    <CardBody>
                        <Media>
                            <img src={avatarImg7} className="avatar-lg rounded-circle mr-2" alt="shreyu" />

                            <Media body>
                                <h5 className="mt-2 mb-0">Shreyu N</h5>
                                <h6 className="text-muted font-weight-normal mt-1 mb-4">New York, USA</h6>
                            </Media>

                            <UncontrolledDropdown className="float-right">
                                <DropdownToggle tag="button" className="dropdown-toggle arrow-none btn btn-link text-muted p-0">
                                    <i className="uil uil-ellipsis-v font-size-16 text-muted"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem><i className="uil uil-edit-alt mr-2"></i>Edit</DropdownItem>
                                    <DropdownItem><i className="uil uil-refresh mr-2"></i>Refresh</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="text-danger"><i className="uil uil-trash mr-2"></i>Delete</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Media>

                        <div className="mt-2 mb-3 row justify-content-between">
                            <div className="col-sm-5">
                                <span className="font-size-15"><i className='uil uil-calendar-alt mr-1'></i>40 Days Ago</span>
                            </div>
                            <div className="col-sm mt-2 mt-sm-0">
                                <span className="font-size-15"><i
                                    className='uil uil-users-alt mr-1'></i>12,001</span>
                            </div>
                            <div className="col-sm mt-2 mt-sm-0 text-sm-right">
                                <span className="font-size-15"><i
                                    className='uil uil-calendar-alt mr-1'></i>1200</span>
                            </div>
                        </div>

                        <div className="mt-1 pt-2 border-top text-left">
                            <p className="text-muted mb-2">Hi I'm Shreyu. I am foodie and love to eat different cuisine!</p>
                        </div>

                        <div className="row mt-4 mb-3">
                            <div className="col">
                                <img src={img4} alt=""
                                    className="img-fluid rounded shadow" />
                            </div>
                            <div className="col">
                                <img src={img5} alt=""
                                    className="img-fluid rounded shadow" />
                            </div>
                            <div className="col">
                                <img src={img6} alt=""
                                    className="img-fluid rounded shadow" />
                            </div>
                        </div>

                        <div className="row mt-5 text-center">
                            <div className="col">
                                <button type="button" className="btn btn-primary btn-block mr-1">Follow</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-white btn-block">Message</button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col md={6} xl={3}>
                <Card>
                    <Row className="no-gutters">
                        <Col md={4}>
                            <img src={avatarImg7} className="card-img" alt="shreyu" />
                        </Col>
                        <Col md={8}>
                            <CardBody>
                                <h5 className="card-title mb-1">Shreyu N</h5>
                                <h6 className="text-muted font-weight-normal mt-0 mb-3">New York, USA</h6>
                                <div className="card-text row text-center">
                                    <div className="col">
                                        <button type="button"
                                            className="btn btn-primary btn-sm btn-block mr-1">Follow</button>
                                    </div>
                                    <div className="col">
                                        <button type="button"
                                            className="btn btn-white btn-sm btn-block">Message</button>
                                    </div>
                                </div>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>

                <Card>
                    <CardBody className="p-3">
                        <Media>
                            <img src={avatarImg7} className="mr-3 avatar-lg rounded" alt="shreyu" />
                            <Media body>
                                <h5 className="mt-1 mb-0">Shreyu N</h5>
                                <h6 className="font-weight-normal mt-1 mb-1">
                                    <a href="/">@shreyu</a>
                                </h6>
                                <p className="text-muted">Designer | Creative | Thinker</p>
                            </Media>
                        </Media>

                        <Row className="mt-2 border-top pt-2">
                            <Col>
                                <Media>
                                    <Users className="icon-dual align-self-center mr-2"></Users>
                                    <Media body>
                                        <h5 className="mt-2 pt-1 mb-0 font-size-16">1.9M</h5>
                                        <h6 className="font-weight-normal mt-0">Followers</h6>
                                    </Media>
                                </Media>
                            </Col>
                            <Col>
                                <Media>
                                    <Eye className="icon-dual align-self-center mr-2"></Eye>
                                    <Media body>
                                        <h5 className="mt-2 pt-1 mb-0 font-size-16">19M</h5>
                                        <h6 className="font-weight-normal mt-0">Views</h6>
                                    </Media>
                                </Media>
                            </Col>
                            <Col>
                                <Media>
                                    <FileText className="icon-dual align-self-center mr-2"></FileText>
                                    <Media body>
                                        <h5 className="mt-2 pt-1 mb-0 font-size-16">1k</h5>
                                        <h6 className="font-weight-normal mt-0">Posts</h6>
                                    </Media>
                                </Media>
                            </Col>
                        </Row>

                        <Row className="mt-3 text-center">
                            <Col>
                                <button type="button"
                                    className="btn btn-primary btn-sm btn-block mr-1">Follow</button>
                            </Col>
                            <Col>
                                <button type="button"
                                    className="btn btn-white btn-sm btn-block mr-1">Message</button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>


    </React.Fragment>
}


export default Profiles;