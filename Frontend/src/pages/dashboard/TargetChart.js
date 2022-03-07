import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

const TargetChart = () => {
    const options = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            axisBorder: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f3f4f7',
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return '$ ' + val + ' thousands';
                },
            },
        },
    };

    const data = [
        {
            name: 'Net Profit',
            data: [35, 44, 55, 57, 45, 32, 24],
        },
        {
            name: 'Revenue',
            data: [52, 76, 85, 101, 86, 72, 56],
        },
    ];

    return (
        <Card>
            <CardBody className="pb-0">
                <h5 className="card-title header-title">Targets</h5>

                <Chart options={options} series={data} type="bar" className="apex-charts mt-3" height={296} />
            </CardBody>
        </Card>
    );
};

export default TargetChart;
