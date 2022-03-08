// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

// simple bar chart
const BarChart = () => {
    const apexBarChartOpts = {
        chart: {
            height: 380,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        tooltip: {
            theme: 'dark',
            x: { show: false }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff'],
            },
        },
        colors: ["#5369f8", "#43d39e", "#f77e53", "#ffbe0b"],
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },

        xaxis: {
            categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
            axisBorder: {
                color: '#d6ddea',
            },
            axisTicks: {
                color: '#d6ddea',
            }
        },
        yaxis: {
            labels: {
                offsetX: -10,
            }
        },
        legend: {
            offsetY: -10,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    const apexBarChartData = [
        {
            name: 'Series 1',
            data: [44, 55, 41, 64, 22, 43, 21],
        },
        {
            name: 'Series 2',
            data: [53, 32, 33, 52, 13, 44, 32],
        },
    ];

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-3">Bar Chart</h4>
                <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" />
            </CardBody>
        </Card>
    );
};

export default BarChart;
