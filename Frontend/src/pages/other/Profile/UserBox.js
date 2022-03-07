import React from 'react';
import { Card, CardBody, Row, Col, Progress } from 'reactstrap';

import profileImg from '../../../assets/images/users/avatar-7.jpg';

const UserBox = () => {
    return (
        <Card className="">
            <CardBody className="profile-user-box">
                <Row>
                    <Col>
                        <div className="text-center mt-3">
                            <img src={profileImg} alt=""
                                className="avatar-lg rounded-circle" />
                            <h5 className="mt-2 mb-0">Shreyu N</h5>
                            <h6 className="text-muted font-weight-normal mt-2 mb-0">User Experience Specialist</h6>
                            <h6 className="text-muted font-weight-normal mt-1 mb-4">San Francisco, CA</h6>

                            <Progress className="mb-4" value={60} color="success" style={{ 'height': '14px' }}>
                                <span className="font-size-12 font-weight-bold">Your Profile is <span className="font-size-11">60%</span> completed</span>
                            </Progress>

                            <button type="button" className="btn btn-primary btn-sm mr-1">Follow</button>
                            <button type="button" className="btn btn-white btn-sm">Message</button>
                        </div>

                        <div className="mt-5 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">About</h4>
                            <p className="text-muted mb-4">Hi I'm Shreyu. I am user experience and user
                                interface designer. I have been working on UI & UX since last 10 years.</p>
                        </div>

                        <div className="mt-3 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">Contact Information</h4>
                            <div className="table-responsive">
                                <table className="table table-borderless mb-0 text-muted">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td>xyz123@gmail.com</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Phone</th>
                                            <td>(123) 123 1234</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>1975 Boring Lane, San Francisco, California, United States -
                                                            94108</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-top">
                            <h4 className="mb-3 font-size-15">Skills</h4>
                            <label className="badge badge-soft-primary mr-1">UI design</label>
                            <label className="badge badge-soft-primary mr-1">UX</label>
                            <label className="badge badge-soft-primary mr-1">Sketch</label>
                            <label className="badge badge-soft-primary mr-1">Photoshop</label>
                            <label className="badge badge-soft-primary mr-1">Frontend</label>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default UserBox;
