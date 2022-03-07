import React from 'react';
import { Card, CardBody, Row, Col, Badge } from 'reactstrap';


const Badges = () => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <CardBody >
                            <h4 className="mb-3 mt-0 header-title">Badges</h4>

                            <Row>
                                <Col xl={4}>

                                    <h5 className="font-size-15 mb-1">Default</h5>
                                    <p className="sub-header">
                                        Badges scale to match the size of the immediate parent element.
                                    </p>

                                    {colors.map((color, idx) => {
                                        return <Badge color={color} key={idx} className="mr-1">{color}</Badge>
                                    })}
                                </Col>

                                <Col xl={4}>
                                    <div className="mt-4 mt-xl-0">
                                        <h5 className="font-size-15 mb-1">Pill Badges</h5>
                                        <p className="sub-header">
                                            Use the <code>pill</code> modifier property to make badges more rounded.
                                        </p>

                                        {colors.map((color, idx) => {
                                            return <Badge color={color} key={idx} pill className="mr-1">{color}</Badge>
                                        })}
                                    </div>
                                </Col>

                                <Col xl={4}>
                                    <div className="mt-4 mt-xl-0">
                                        <h5 className="font-size-15 mb-1">Badges Lighten</h5>
                                        <p className="sub-header">
                                            Use the color <code>soft-*</code> modifier property for a lighten badge.
                                        </p>

                                        {colors.map((color, idx) => {
                                            return <Badge color={`soft-${color}`} key={idx} className="mr-1">{color}</Badge>
                                        })}
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

export default Badges;
