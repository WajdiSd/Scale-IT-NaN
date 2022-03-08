// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

import LineChart from './LineChart';
import LineAnnotationChart from './LineAnnotationChart';
import SplineAreaChart from './SplineAreaChart';
import StackedAreaChart from './StackedAreaChart';
import BarChart from './BarChart';
import StackedBarChart from './StackedBarChart';
import DonutChart from './DonutChart';
import PieChart from './PieChart';
import MixedChart from './MixedChart';

const ApexChart = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Charts', path: '/charts' },
                            { label: 'Apex', path: '/charts', active: true },
                        ]}
                        title={'Charts'}
                    />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <LineChart />
                </Col>

                <Col xl={6}>
                    <LineAnnotationChart />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <SplineAreaChart />
                </Col>

                <Col xl={6}>
                    <StackedAreaChart />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <BarChart />
                </Col>

                <Col xl={6}>
                    <StackedBarChart />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <DonutChart />
                </Col>

                <Col xl={6}>
                    <PieChart />
                </Col>
            </Row>

            <Row>
                <Col>
                    <MixedChart />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ApexChart;
