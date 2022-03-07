import React from 'react';
import { Card, CardBody } from 'reactstrap';

import avatar2 from '../../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../../assets/images/users/avatar-3.jpg';
import avatar9 from '../../../../assets/images/users/avatar-9.jpg';
import avatar10 from '../../../../assets/images/users/avatar-10.jpg';


const About = () => {

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h6 className="mt-0 header-title">About Project</h6>

                    <div className="text-muted mt-3">
                        <p>To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth.</p>
                        <p>Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages.</p>
                        <ul className="pl-4 mb-4">
                            <li>Quis autem vel eum iure</li>
                            <li>Ut enim ad minima veniam</li>
                            <li>Et harum quidem rerum</li>
                            <li>Nam libero cum soluta</li>
                        </ul>

                        <div className="tags">
                            <h6 className="font-weight-bold">Tags</h6>
                            <div className="text-uppercase">
                                <a href="/" className="badge badge-soft-primary mr-2">Html</a>
                                <a href="/" className="badge badge-soft-primary mr-2">Css</a>
                                <a href="/" className="badge badge-soft-primary mr-2">Bootstrap</a>
                                <a href="/" className="badge badge-soft-primary mr-2">JQuery</a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="mt-4">
                                    <p className="mb-2"><i className="uil-calender text-danger"></i> Start Date</p>
                                    <h5 className="font-size-16">15 July, 2019</h5>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="mt-4">
                                    <p className="mb-2"><i className="uil-calendar-slash text-danger"></i> Due Date</p>
                                    <h5 className="font-size-16">15 July, 2019</h5>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="mt-4">
                                    <p className="mb-2"><i className="uil-dollar-alt text-danger"></i> Budget</p>
                                    <h5 className="font-size-16">$1325</h5>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="mt-4">
                                    <p className="mb-2"><i className="uil-user text-danger"></i> Owner</p>
                                    <h5 className="font-size-16">Rick Perry</h5>
                                </div>
                            </div>
                        </div>

                        <div className="assign team mt-4">
                            <h6 className="font-weight-bold">Assign To</h6>
                            <a href="/">
                                <img src={avatar2} alt="" className="avatar-sm m-1 rounded-circle" />
                            </a>
                            <a href="/">
                                <img src={avatar3} alt="" className="avatar-sm m-1 rounded-circle" />
                            </a>

                            <a href="/">
                                <img src={avatar9} alt="" className="avatar-sm m-1 rounded-circle" />
                            </a>

                            <a href="/">
                                <img src={avatar10} alt="" className="avatar-sm m-1 rounded-circle" />
                            </a>
                        </div>

                        <div className="mt-4">
                            <h6 className="font-weight-bold">Attached Files</h6>

                            <div className="row">
                                <div className="col-xl-4 col-md-6">
                                    <div className="p-2 border rounded mb-2">
                                        <div className="media">
                                            <div className="avatar-sm font-weight-bold mr-3">
                                                <span className="avatar-title rounded bg-soft-primary text-primary">
                                                    <i className="uil-file-plus-alt font-size-18"></i>
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <a href="/" className="d-inline-block mt-2">Landing 1.psd</a>
                                            </div>
                                            <div className="float-right mt-1">
                                                <a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6">
                                    <div className="p-2 border rounded mb-2">
                                        <div className="media">
                                            <div className="avatar-sm font-weight-bold mr-3">
                                                <span className="avatar-title rounded bg-soft-primary text-primary">
                                                    <i className="uil-file-plus-alt font-size-18"></i>
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <a href="/" className="d-inline-block mt-2">Landing 2.psd</a>
                                            </div>
                                            <div className="float-right mt-1">
                                                <a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default About;
