import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap';

import imgNotFound from '../../assets/images/not-found.png';


class Error404 extends Component {

    componentDidMount() {
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        document.body.classList.remove('authentication-bg');
    }

    render() {
        return (
            <React.Fragment>
                <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={4} lg={5}>
                                <div className="text-center">
                                    <div>
                                        <img src={imgNotFound} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="text-center">
                                <h3 className="mt-3">We couldn’t connect the dots</h3>
                                <p className="text-muted mb-5">This page was not found. <br /> You may have mistyped the address or the page may have moved.</p>

                                <Link to="/" className="btn btn-lg btn-primary mt-4">Take me back to Home</Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Error404;