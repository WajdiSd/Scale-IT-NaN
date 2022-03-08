import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';

const RevenueChart = () => {
    const getDaysInMonth = (month, year) => {
        var date = new Date(year, month, 1);
        var days = [];
        var idx = 0;
        while (date.getMonth() === month && idx < 15) {
            var d = new Date(date);
            days.push(d.getDate() + " " + d.toLocaleString('en-us', { month: 'short' }));
            date.setDate(date.getDate() + 1);
            idx += 1;
        }
        return days;
    }

    var now = new Date();
    var labels = getDaysInMonth(now.getMonth(), now.getFullYear());

    const apexLineChartWithLables = {
        chart: {
            height: 296,
            type: 'area',
            toolbar: {
                show: false,
            },
            parentHeightOffset: 0,
        },
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 4
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#43d39e'],
        xaxis: {
            type: 'string',
            categories: labels,
            tooltip: {
                enabled: false
            },
            axisBorder: {
                show: false
            },
            labels: { }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val + "k"
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: "vertical",
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [45, 100]
            },
        },
        tooltip: {
            theme: 'dark',
            x: { show: false }
        }
    };

    const apexLineChartWithLablesData = [{
        name: 'Revenue',
        data: [10, 20, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40, 30, 50, 35]
    }];

    return (
        <Card>
            <CardBody className="pb-0">
                <Nav className="card-nav float-right">
                    <NavItem>
                        <NavLink className="text-muted" href="#">Today</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-muted" href="#">7d</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="" active href="#">15d</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-muted" href="#">1m</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-muted" href="#">1y</NavLink>
                    </NavItem>
                </Nav>

                <h5 className="card-title mb-0 header-title">Revenue</h5>

                <Chart
                    options={apexLineChartWithLables}
                    series={apexLineChartWithLablesData}
                    type="area"
                    className="apex-charts mt-3"
                    height={296}
                />
            </CardBody>
        </Card>
    );
};

export default RevenueChart;
