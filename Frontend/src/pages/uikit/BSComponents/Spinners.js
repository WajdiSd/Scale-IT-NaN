import React from 'react';
import { Row, Col, Card, CardBody, Spinner } from 'reactstrap';

const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];


const BorderedSpinners = () => {
    return (
        <React.Fragment>
            <h5 className="font-size-15 mb-1">Border spinner</h5>
            <p className="sub-header">Use the border spinners for a lightweight loading indicator.</p>

            <div>

                {colors.map((color, index) => {
                    return <Spinner key={index} className="m-2" color={color} />;
                })}
            </div>
        </React.Fragment>
    );
};

const GrowingSpinners = () => {
    return (
        <React.Fragment>
            <h5 className="font-size-15 mb-1">Growing spinner</h5>
            <p className="sub-header">If you don’t fancy a border spinner, switch to the grow spinner. While it doesn’t technically spin, it does repeatedly grow!</p>

            <div>

                {colors.map((color, index) => {
                    return <Spinner key={index} className="m-2" type="grow" color={color} />;
                })}
            </div>
        </React.Fragment>
    );
};

const Spinners = () => {

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="mb-3 mt-0 header-title">Spinners</h4>

                    <Row>
                        <Col xl={6}>
                            <BorderedSpinners />
                        </Col>

                        <Col xl={6}>
                            <GrowingSpinners />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Spinners;
