// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

// stacked bar chart
const StackedBarChart = () => {
    const apexBarChartStackedOpts = {
        chart: {
            height: 380,
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            show: false,
        },
        xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            labels: {
                formatter: function(val) {
                    return val + 'K';
                },
            },
        },
        yaxis: {
            title: {
                text: undefined,
            },
        },
        colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b'],
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + 'K';
                },
            },
            theme: 'dark',
            x: { show: false }
        },
        fill: {
            opacity: 1,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    const apexBarChartStackedData = [
        {
            name: 'Marine Sprite',
            data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
            name: 'Striking Calf',
            data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
            name: 'Tank Picture',
            data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
            name: 'Bucket Slope',
            data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
            name: 'Reborn Kid',
            data: [25, 12, 19, 32, 25, 24, 10],
        },
    ];

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-3">Stacked Bar Chart</h4>
                <Chart
                    options={apexBarChartStackedOpts}
                    series={apexBarChartStackedData}
                    type="bar"
                    className="apex-charts"
                />
            </CardBody>
        </Card>
    );
};

export default StackedBarChart;
