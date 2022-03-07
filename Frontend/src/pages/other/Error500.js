import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap';

import imgServerDown from '../../assets/images/server-down.png';


class Error500 extends Component {

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
                                        <img src={imgServerDown} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="text-center">
                                <h3 className="mt-3">Opps, something went wrong</h3>
                                <p className="text-muted mb-5">Server Error 500. We apoligise and are fixing the problem.<br /> Please try again at a later stage.</p>

                                <Link to="/" className="btn btn-lg btn-primary mt-4">Take me back to Home</Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Error500;