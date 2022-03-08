import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../../components/PageTitle';

import Alerts from './Alerts';
import Toasts from './Toasts';
import Buttons from './Buttons';
import Badges from './Badges';
import Cards from './Cards';
import Dropdowns from './Dropdowns';
import Tabs from './Tabs';
import Accordions from './Accordions';
import Modals from './Modals';
import Progressbars from './Progressbars';
import Popovers from './Popovers';
import Tooltips from './Tooltips';
import Spinners from './Spinners';


const BSComponents = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Components', path: '/ui/bscomponents' },
                            { label: 'Bootstrap UI', path: '/ui/bscomponents', active: true },
                        ]}
                        title={'Bootstrap UI'}
                    />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <Alerts />
                </Col>
                <Col xl={6}>
                    <Toasts />
                </Col>
            </Row>

            <Buttons />
            <Badges />
            <Cards />
            <Dropdowns />
            <Tabs />
            <Accordions />
            <Modals />
            <Progressbars />

            <Row>
                <Col xl={6}>
                    <Popovers />
                </Col>

                <Col xl={6}>
                    <Tooltips />
                </Col>
            </Row>

            <Spinners />
        </React.Fragment>
    );
};

export default BSComponents;
