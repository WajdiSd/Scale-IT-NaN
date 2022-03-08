import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

const SalesChart = () => {
    const options = {
        chart: {
            height: 302,
            type: 'donut',
            toolbar: {
                show: false,
            },
            parentHeightOffset: 0,
        },
        colors: ["#5369f8", "#43d39e", "#f77e53", "#ffbe0b"],
        grid: {
            borderColor: '#f1f3fa',
            padding: {
                left: 0,
                right: 0,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                },
                expandOnClick: false
            }
        },
        legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'left',
            itemMargin: {
                horizontal: 6,
                vertical: 3
            }
        },
        labels: ['Clothes 44k', 'Smartphons 55k', 'Electronics 41k', 'Other 17k'],
        responsive: [{
            breakpoint: 480,
            options: {
                
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            y: {
                formatter: function(value) { return value + "k" }
            },
        }
    };

    const data = [44, 55, 41, 17];

    return (
        <Card>
            <CardBody className="">
                <h5 className="card-title mt-0 mb-0 header-title">Sales By Category</h5>

                <Chart
                    options={options}
                    series={data}
                    type="donut"
                    className="apex-charts mb-0 mt-4"
                    height={302}
                />
            </CardBody>
        </Card>
    );
};

export default SalesChart;
