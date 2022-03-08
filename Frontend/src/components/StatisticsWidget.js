import React from 'react';
import { Card, CardBody, Media } from 'reactstrap';
import classNames from 'classnames';

const StatisticsWidget = (props) => {

    const Icon = props.icon;
    return (
        <Card className={classNames(props.bgClass)}>
            <CardBody className="p-0">
                <Media className="p-3">
                    <Media body>
                        <span className="text-muted text-uppercase font-size-12 font-weight-bold">{props.description}</span>
                        <h2 className="mb-0">{props.title}</h2>
                    </Media>
                    <div className="align-self-center">
                        {Icon && <Icon className={classNames("icon-lg", props.iconClass)}></Icon>}
                    </div>
                </Media>
            </CardBody>
        </Card>
    );
};

export default StatisticsWidget;
