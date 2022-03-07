import React from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';

import img1 from '../../../assets/images/small/img-1.jpg';
import img2 from '../../../assets/images/small/img-2.jpg';
import img3 from '../../../assets/images/small/img-3.jpg';


const Cards = () => {

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="mb-3 mt-0 header-title">Cards</h4>

                    <Row className="bg-light p-3">
                        <Col xl={3} lg={6}>
                            <Card className="mb-4 mb-xl-0">
                                <img className="card-img-top img-fluid" src={img1} alt="" />
                                <CardBody>
                                    <h5 className="card-title font-size-16">Card title</h5>
                                    <p className="card-text text-muted">Some quick example text to build on the card title and make
                                        up the bulk of the card's content. With supporting text below as a natural lead-in to additional content.</p>
                                    <Button color="primary">Button</Button>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={3} lg={6}>
                            <Card className="mb-4 mb-xl-0">
                                <img className="card-img-top img-fluid" src={img2} alt="" />
                                <CardBody>
                                    <h5 className="card-title font-size-16">Card title</h5>
                                    <p className="card-text text-muted">Some quick example text to build on the card title.</p>
                                </CardBody>
                                <ul className="list-group list-group-flush  text-muted">
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                </ul>
                                <CardBody>
                                    <a href="/" className="card-link text-custom">Card link</a>
                                    <a href="/" className="card-link text-custom">Another link</a>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={5}>
                                        <img className="card-img" src={img3} alt="" />
                                    </Col>
                                    <Col md={7}>
                                        <CardBody>
                                            <h5 className="card-title font-size-16">Card title</h5>
                                            <p className="card-text text-muted">This is a wider card with supporting text lead-in to additional content.</p>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                            <Card>
                                <Row className="no-gutters align-items-center">
                                    <Col md={7}>
                                        <CardBody>
                                            <h5 className="card-title font-size-16">Card title</h5>
                                            <p className="card-text text-muted">This is a wider card with supporting text lead-in to additional content.</p>
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        </CardBody>
                                    </Col>
                                    <Col md={5}>
                                        <img className="card-img" src={img3} alt="" />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Cards;
