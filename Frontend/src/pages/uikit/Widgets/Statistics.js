import React from 'react';
import { Row, Col } from 'reactstrap';
import * as FeatherIcon from 'react-feather';

import StatisticsWidget from '../../../components/StatisticsWidget';
import StatisticsProgressWidget from '../../../components/StatisticsProgressWidget';
import StatisticsChartWidget from '../../../components/StatisticsChartWidget';
import StatisticsChartWidget2 from '../../../components/StatisticsChartWidget2';


const Statistics = () => {
    return <React.Fragment>

        <Row>
            <Col md={6} xl={3}>
                <StatisticsWidget description="Today Revenue" title="$2100" icon={FeatherIcon.ShoppingBag} iconClass="icon-dual-primary"></StatisticsWidget>
            </Col>
            <Col md={6} xl={3}>
                <StatisticsWidget description="Product Sold" title="1021" icon={FeatherIcon.Coffee} iconClass="icon-dual-warning"></StatisticsWidget>
            </Col>
            <Col md={6} xl={3}>
                <StatisticsWidget description="New Customers" title="11" icon={FeatherIcon.Users} iconClass="icon-dual-success"></StatisticsWidget>
            </Col>
            <Col md={6} xl={3}>
                <StatisticsWidget description="New Visitors" title="750" icon={FeatherIcon.FileText} iconClass="icon-dual-info"></StatisticsWidget>
            </Col>
        </Row>

        <Row>
            <Col md={6} xl={3}>
                <StatisticsProgressWidget description="Today Revenue" title="$2100" color="primary" progressValue="32" progressTitle="36% Avg"></StatisticsProgressWidget>
            </Col>
            <Col md={6} xl={3}>
                <StatisticsProgressWidget description="Product Sold" title="1021" color="warning" progressValue="60" progressTitle="36 Daily Avg"></StatisticsProgressWidget>
            </Col>
            <Col md={6} xl={3}>
                <StatisticsProgressWidget description="New Customers" title="11" color="success" progressValue="45" progressTitle="3 Daily Avg"></StatisticsProgressWidget>
            </Col>
            <Col md={6} xl={3}>
                <StatisticsProgressWidget description="New Visitors" title="750" color="success" progressValue="67" progressTitle="300 Daily Avg"></StatisticsProgressWidget>
            </Col>
        </Row>

        <Row>
            <Col md={6} xl={3}>
                <StatisticsChartWidget
                    description="Today Revenue"
                    title="$2100"
                    data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                    trend={{
                        textClass: 'text-success',
                        icon: 'uil uil-arrow-up',
                        value: '10.21%'
                    }}></StatisticsChartWidget>
            </Col>

            <Col md={6} xl={3}>
                <StatisticsChartWidget
                    description="Product Sold"
                    title="1065"
                    colors={['#f77e53']}
                    data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                    trend={{
                        textClass: 'text-danger',
                        icon: 'uil uil-arrow-down',
                        value: '5.05%'
                    }}></StatisticsChartWidget>
            </Col>

            <Col md={6} xl={3}>
                <StatisticsChartWidget
                    description="New Customers"
                    title="11"
                    colors={['#43d39e']}
                    data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                    trend={{
                        textClass: 'text-success',
                        icon: 'uil uil-arrow-up',
                        value: '25.16%'
                    }}></StatisticsChartWidget>
            </Col>

            <Col md={6} xl={3}>
                <StatisticsChartWidget
                    description="New Visitors"
                    title="750"
                    colors={['#ffbe0b']}
                    data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                    trend={{
                        textClass: 'text-danger',
                        icon: 'uil uil-arrow-down',
                        value: '5.05%'
                    }}></StatisticsChartWidget>
            </Col>
        </Row>

        <Row>
            <Col md={6} xl={4}>
                <StatisticsChartWidget2
                    name="Visits"
                    type="area"
                    title="21,000"
                    subtitle="Visits"
                    colors={['#5369f8']}
                    data={[47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51]}></StatisticsChartWidget2>
            </Col>
            <Col md={6} xl={4}>
                <StatisticsChartWidget2
                    name="Customers"
                    type="area"
                    title="1100"
                    subtitle="Customers"
                    colors={['#43d39e']}
                    data={[47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51]}></StatisticsChartWidget2>
            </Col>
            <Col md={6} xl={4}>
                <StatisticsChartWidget2
                    name="Revenue"
                    type="area"
                    title="$201,200"
                    subtitle="Revenue"
                    colors={['#f77e53']}
                    data={[47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51]}></StatisticsChartWidget2>
            </Col>
        </Row>

    </React.Fragment>
}


export default Statistics;