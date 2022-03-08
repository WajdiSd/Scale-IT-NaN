// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

// simple pie chart
const PieChart = () => {
    const apexDonutOpts = {
        chart: {
            height: 320,
            type: 'pie',
        },
        labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
        colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b'],
        tooltip: {
            theme: 'dark',
            x: { show: false }
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        height: 240,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    const apexDonutData = [44, 55, 41, 17, 15];

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-3">Pie Chart</h4>
                <Chart options={apexDonutOpts} series={apexDonutData} type="pie" height={320} className="apex-charts" />
            </CardBody>
        </Card>
    );
};

export default PieChart;
