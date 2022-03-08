import React from 'react';
import { Row, Col, Media } from 'reactstrap';

import img2 from '../../../../assets/images/small/img-2.jpg';
import img3 from '../../../../assets/images/small/img-3.jpg';
import img4 from '../../../../assets/images/small/img-4.jpg';
import img6 from '../../../../assets/images/small/img-6.jpg';
import img7 from '../../../../assets/images/small/img-7.jpg';


const Attachments = () => {

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <h5 className="mb-3 header-title">Attached Files</h5>

                    <div>
                        <div className="p-2 border rounded mb-3">
                            <Media>
                                <div className="avatar-sm font-weight-bold mr-3">
                                    <span
                                        className="avatar-title rounded bg-soft-primary text-primary">
                                        <i className="uil-file-plus-alt font-size-18"></i>
                                    </span>
                                </div>
                                <Media body>
                                    <a href="/" className="d-inline-block mt-2">Landing 1.psd</a>
                                </Media>
                                <div className="float-right mt-1">
                                    <a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
                                </div>
                            </Media>
                        </div>

                        <div className="p-2 border rounded mb-3">
                            <Media>
                                <div className="avatar-sm font-weight-bold mr-3">
                                    <span
                                        className="avatar-title rounded bg-soft-primary text-primary">
                                        <i className="uil-file-plus-alt font-size-18"></i>
                                    </span>
                                </div>
                                <Media body>
                                    <a href="/" className="d-inline-block mt-2">Landing 2.psd</a>
                                </Media>
                                <div className="float-right mt-1">
                                    <a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
                                </div>
                            </Media>
                        </div>

                        <div className="p-2 border rounded mb-3">
                            <div>
                                <a href="/" className="d-inline-block m-1"><img src={img2} alt="" className="avatar-lg rounded" /></a>
                                <a href="/" className="d-inline-block m-1"><img src={img3} alt="" className="avatar-lg rounded" /></a>
                                <a href="/" className="d-inline-block m-1"><img src={img4} alt="" className="avatar-lg rounded" /></a>
                            </div>
                        </div>

                        <div className="p-2 border rounded mb-3">
                            <Media>
                                <div className="avatar-sm font-weight-bold mr-3">
                                    <span
                                        className="avatar-title rounded bg-soft-primary text-primary">
                                        <i className="uil-file-plus-alt font-size-18"></i>
                                    </span>
                                </div>
                                <Media body>
                                    <a href="/" className="d-inline-block mt-2">Logo.psd</a>
                                </Media>
                                <div className="float-right mt-1">
                                    <a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
                                </div>
                            </Media>
                        </div>

                        <div className="p-2 border rounded mb-3">
                            <div>
                                <a href="/" className="d-inline-block m-1"><img src={img7} alt="" className="avatar-lg rounded" /></a>
                                <a href="/" className="d-inline-block m-1"><img src={img6} alt="" className="avatar-lg rounded" /></a>
                            </div>
                        </div>

                        <div className="p-2 border rounded mb-3">
                            <Media>
                                <div className="avatar-sm font-weight-bold mr-3">
                                    <span
                                        className="avatar-title rounded bg-soft-primary text-primary">
                                        <i className="uil-file-plus-alt font-size-18"></i>
                                    </span>
                                </div>
                                <Media body>
                                    <a href="/" className="d-inline-block mt-2">Client.docx</a>
                                </Media>
                                <div className="float-right mt-1">
                                    <a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
                                </div>
                            </Media>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Attachments;
