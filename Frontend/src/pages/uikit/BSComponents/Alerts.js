import React from 'react';
import { Card, CardBody, UncontrolledAlert } from 'reactstrap';


const Alerts = () => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

    return (
        <React.Fragment>
            <Card>
                <CardBody className="pb-2">
                    <h5 className="header-title mb-1 mt-0">Alerts</h5>
                    <p className="sub-header">
                        Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.
                    </p>

                    {colors.map((color, index) => {
                        return (
                            <UncontrolledAlert color={color} key={index}>
                                <strong>{color} - </strong> A simple {color} alert—check it out!
                        </UncontrolledAlert>
                        );
                    })}

                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Alerts;
