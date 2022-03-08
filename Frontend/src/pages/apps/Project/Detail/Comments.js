import React from 'react';
import { Row, Col, Media } from 'reactstrap';

import avatar2 from '../../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../../assets/images/users/avatar-3.jpg';
import avatar7 from '../../../../assets/images/users/avatar-7.jpg';

const Comments = () => {

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <h5 className="mb-4 pb-1 header-title">Comments (6)</h5>

                    <Media className="mb-4 font-size-14">
                        <div className="mr-3">
                            <a href="/">
                                <img src={avatar2} className="media-object rounded-circle avatar-sm" alt="" />
                            </a>
                        </div>
                        <Media body>
                            <h5 className="mt-0 font-size-15">John Cooks</h5>
                            <p className="text-muted mb-1">
                                <a href="/" className="text-danger mr-1">@Rick Perry</a>
                                Their separate existence is a myth.
                            </p>
                            <a href="/" className="text-primary">Reply</a>
                        </Media>
                    </Media>

                    <Media className="mb-4 font-size-14">
                        <div className="mr-3">
                            <a href="/">
                                <img src={avatar3} className="media-object rounded-circle avatar-sm" alt="" />
                            </a>
                        </div>
                        <Media body>
                            <h5 className="mt-0 font-size-15">Jayden Dowie</h5>
                            <p className="text-muted mb-1">
                                <a href="/" className="text-danger mr-1">@Rick Perry</a>
                                It will be as simple as occidental in fact be Occidental will seem like simplified.
                            </p>
                            <a href="/" className="text-primary">Reply</a>

                            <Media className="mt-3 font-size-14">
                                <div className="d-flex mr-3">
                                    <a href="/">
                                        <div className="avatar-sm font-weight-bold d-inline-block m-1">
                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">R</span>
                                        </div>
                                    </a>
                                </div>
                                <Media body>
                                    <h5 className="mt-0 font-size-15">Ray Roberts</h5>
                                    <p className="text-muted mb-0"><a href="/" className="text-danger mr-1">@Rick Perry</a>Cras sit amet nibh libero. </p>
                                    <a href="/" className="text-primary">Reply</a>
                                </Media>
                            </Media>
                        </Media>
                    </Media>

                    <Media className="mb-4 font-size-14">
                        <div className="mr-3">
                            <a href="/">
                                <img src={avatar2} className="media-object rounded-circle avatar-sm" alt="" />
                            </a>
                        </div>
                        <Media body>
                            <h5 className="mt-0 font-size-15">John Cooks</h5>
                            <p className="text-muted mb-1">
                                <a href="/" className="text-danger mr-1">@Rick Perry</a>
                                Itaque earum rerum hic
                            </p>
                            <div className="p-2 border rounded mb-2">
                                <Media>
                                    <div className="avatar-sm font-weight-bold mr-3">
                                        <span
                                            className="avatar-title rounded bg-soft-primary text-primary">
                                            <i
                                                className="uil-file-plus-alt font-size-18"></i>
                                        </span>
                                    </div>
                                    <Media body>
                                        <a href="/" className="d-inline-block mt-2">Landing1.psd</a>
                                        <div className="float-right mt-1">
                                            <a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
                                        </div>
                                    </Media>
                                </Media>
                            </div>
                            <a href="/" className="text-primary">Reply</a>
                        </Media>
                    </Media>

                    <Media>
                        <div className="d-flex mr-3">
                            <a href="/"> <img className="media-object rounded-circle avatar-sm" alt="" src={avatar7} /> </a>
                        </div>
                        <Media body>
                            <input type="text" className="form-control input-sm" placeholder="Some text value..." />
                        </Media>
                    </Media>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Comments;
