import React from 'react';
import { Card, CardBody, Media } from 'reactstrap';
import classNames from 'classnames';


const OverviewWidget = (props) => {

    const title = props.title || "Overview";
    const items = props.items || [];
    const bodyClass = props.bodyClass || "px-3 py-4";
    const totalItems = items.length;
    const cardBodyClass = props.cardBodyClass || "p-0";

    return (

        <Card className={classNames(props.bgClass)}>
            <CardBody className={classNames(cardBodyClass)}>
                <h5 className="card-title header-title border-bottom p-3 mb-0">{title}</h5>

                {items.map((item, idx) => {
                    const Icon = item.icon || null;
                    var borderClass = "border-bottom";

                    if (totalItems === idx + 1) {
                        borderClass = null;
                    }

                    return <Media className={classNames(bodyClass, borderClass)} key={idx}>
                        <Media body>
                            <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{item.title}</h4>
                            <span className="text-muted">{item.description}</span>
                        </Media>
                        {Icon && <Icon className="align-self-center icon-dual icon-lg"></Icon>}
                    </Media>
                })}

            </CardBody>
        </Card>
    );
};

export default OverviewWidget;
