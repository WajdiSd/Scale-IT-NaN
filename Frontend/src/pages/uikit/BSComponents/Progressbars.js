import React from 'react';
import { Row, Col, Card, CardBody, Progress } from 'reactstrap';


const DefaultProgressbars = () => {
    return (
        <Card>
            <CardBody>
                <h5 className="font-size-16 mb-1 mt-0">Basic Progressbars</h5>
                <p className="sub-header">Simple examples of progressbar</p>
                <div>

                    <Progress value={2 * 5} className="mb-2" />
                    <Progress color="success" value="25" className="mb-2" />
                    <Progress color="info" value={50} className="mb-2" />
                    <Progress color="warning" value={75} className="mb-2" />
                    <Progress color="danger" value="100" className="mb-2" />

                    <Progress multi className="mb-2">
                        <Progress bar value="15" />
                        <Progress bar color="success" value="30" />
                        <Progress bar color="info" value="25" />
                        <Progress bar color="warning" value="20" />
                        <Progress bar color="danger" value="5" />
                    </Progress>

                    <Progress striped color="success" value="25" className="mb-2" />
                    <Progress animated striped color="danger" value="90" className="mb-2" />
                </div>
            </CardBody>
        </Card>
    );
};

const ProgressbarsSizes = () => {
    return (
        <Card>
            <CardBody>
                <h5 className="header-title mb-1 mt-0">Progressbars Size</h5>
                <p className="sub-header">
                    Progress bars use some of the same button and alert classes for consistent styles.
                </p>

                <div>
                    <Progress value={2 * 5} className="mb-2 progress-sm" />
                    <Progress color="success" value="25" className="mb-2 progress-md" />
                    <Progress color="info" value={50} className="mb-2 progress-lg" />
                    <Progress color="warning" value={75} className="mb-2 progress-xl" />

                    <Progress value={75} className="mb-2 mt-4 progress-xl">You're almost there!</Progress>
                    <Progress color="success" value="100" className="mb-2 progress-xl">You did it!</Progress>
                </div>
            </CardBody>
        </Card>
    );
};

const Progressbars = () => {
    return <React.Fragment>
        <Row>
            <Col lg={6}>
                <DefaultProgressbars />
            </Col>
            <Col lg={6}>
                <ProgressbarsSizes />
            </Col>
        </Row>
    </React.Fragment>
}

export default Progressbars;