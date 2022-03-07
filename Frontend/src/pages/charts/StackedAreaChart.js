// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

// StackedAreaChart
const StackedAreaChart = () => {
    const apexAreaChart2Opts = {
        chart: {
            height: 422,
            type: 'area',
            stacked: true,
            events: {
                selection: function(chart, e) {
                    console.log(new Date(e.xaxis.min));
                },
            },
        },
        colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b'],
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            theme: 'dark',
            x: { show: false }
        },
        stroke: {
            width: 2,
            curve: 'smooth',
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.6,
                opacityTo: 0.8,
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
        },
        xaxis: {
            type: 'datetime',
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                },
            },
        ],
    };

    const generateDayWiseTimeSeries = (baseval, count, yrange) => {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    };

    const apexAreaChart2Data = [
        {
            name: 'South',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: 'North',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 20,
            }),
        },

        {
            name: 'Central',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 15,
            }),
        },
    ];

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-3">Stacked Area</h4>
                <Chart options={apexAreaChart2Opts} series={apexAreaChart2Data} type="area" className="apex-charts" />
            </CardBody>
        </Card>
    );
};

export default StackedAreaChart;
