import React from 'react';
import { Row, Col, Card, CardBody, Media } from 'reactstrap';
import classNames from 'classnames';
import { Users, Briefcase, ShoppingBag } from 'react-feather';


const Pricing = () => {
    const plans = [
        {
            id: 1,
            name: 'Professional Pack',
            icon: Users,
            price: '$19',
            features: ['10 GB Storage', '500 GB Bandwidth', 'No Domain', 'Email Support', '24x7 Support'],
            isRecommended: false,
        },
        {
            id: 2,
            name: 'Business Pack',
            icon: Briefcase,
            price: '$29',
            features: ['50 GB Storage', '900 GB Bandwidth', '2 Domain', 'Email Support', '24x7 Support'],
            isRecommended: true,
        },
        {
            id: 3,
            name: 'Enterprise Pack',
            icon: ShoppingBag,
            price: '$49',
            features: [
                '100 GB Storage',
                'Unlimited Bandwidth',
                '10 Domain',
                'Email Support',
                '24x7 Support',
            ],
            isRecommended: false,
        },
    ];

    return (
        <React.Fragment>

            <Row className="justify-content-center">
                <Col lg={10}>
                    <div className="text-center mt-4 mb-5">
                        <h3>Simple pricing for Everyone</h3>
                        <p className="text-muted">Fully functional accounts are starting from $19/month only</p>
                    </div>

                    <Row>
                        {plans.map((plan, idx) => {
                            const Icon = plan.icon;
                            return (
                                <Col lg={4} key={idx}>
                                    <Card className={classNames('card-pricing')}>
                                        <CardBody className="p-4">
                                            <Media>
                                                <Media body>
                                                    <h5 className="mt-0 mb-2 font-size-16">{plan.name}</h5>
                                                    <h2 className="mt-0 mb-2">{plan.price} <span className="font-size-14">/ Month</span></h2>
                                                </Media>
                                                <div className="align-self-center">
                                                    <Icon className="icon-dual icon-lg"></Icon>
                                                </div>
                                            </Media>
                                            <ul className="card-pricing-features text-muted border-top pt-2 mt-2 pl-0 list-unstyled">
                                                {plan.features.map((feature, idx1) => {
                                                    return <li key={idx1}>
                                                        <i className='uil uil-check text-success font-size-15 mr-1'></i>{feature}</li>;
                                                })}
                                            </ul>

                                            <div className="mt-5 text-center">
                                                <button className={classNames("btn", { "btn-soft-primary": !plan.isRecommended, 'btn-primary': plan.isRecommended }, "px-sm-4")}><i className='uil uil-arrow-right mr-1'></i>Buy Now for {plan.price}</button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default Pricing;
