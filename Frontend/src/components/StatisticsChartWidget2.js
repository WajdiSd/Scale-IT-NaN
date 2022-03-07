import React from 'react';
import { Card, CardBody } from 'reactstrap';
import Chart from 'react-apexcharts';


/**
 * Renders the chart in widget area
 */
const StatisticsChartWidget2 = (props) => {
    // default options
    const options = {
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            width: 2,
            curve: 'smooth',
        },
        yaxis: {
            min: 0,
        },
        colors: props.colors || ['#008FFB'],
        title: {
            text: props.title,
            offsetX: 20,
            offsetY: 20,
            style: {
                fontSize: '24px',
            },
        },
        subtitle: {
            text: props.subtitle,
            offsetX: 20,
            offsetY: 55,
            style: {
                fontSize: '14px',
            },
        },
    };

    // type - defaulted to bar
    const type = props.type || 'bar';

    // data
    const series = [{ name: props.name || 'Data', data: props.data || [] }];

    return (
        <Card>
            <CardBody className="p-0">
                <Chart className="apex-charts" options={options} series={series} type={type} height={172} />
            </CardBody>
        </Card>
    );
};

export default StatisticsChartWidget2;
